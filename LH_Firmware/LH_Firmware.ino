#include <WebSocketsClient.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <HDC1080JS.h>
#include <Wire.h>
#include "time.h"
#include "sntp.h"

#define RELAY4_1 15 // 4채널 12V DC
#define RELAY4_2 2
#define RELAY4_3 0
#define RELAY4_4 4

#define RELAY2_1 12 // 2채널 220V AC
#define RELAY2_2 13

WebSocketsClient webSocket;
WiFiClient mySocket;
HTTPClient myHTTP;
HDC1080JS tempsensor;

unsigned long long lastMS = 0;
unsigned long long lastMS2 = 0;

const char* wlan_ssid             = "drcl-E590";
const char* wlan_password         = "123456789";
const char* ws_host               = "www.rats-lh.com";
const int   ws_port               = 8080;

String CreateCage = "createCage";
String TargetValue = "targetValue";
String ChangeLampState = "changeLampState";

String printurl = "";
String token;     // 사용자 토큰
String userid;    // 사용자 ID
String cagename;  // 사육장 이름
String tempset;   // 온도 설정값
String humidset;  // 습도 설정
String lampstart; // 조명 시작 시간
String lampstop;  // 조명 종료 시간
String pumpstart; // 펌프 시작 시간
String pumphold;  // 펌프 가동 시간
String lampstate; // 램프 작동 상태
String lampstate2;

float tempsetting;
float humidsetting;
int h_start;
int m_start;
int h_stop;
int m_stop;
int h_pstar;
int m_pstar;
int s_pstar = 0;
int h_pstop;
int m_pstop;
int pumpholdsec;

int h_hold;
int m_hold;
int s_hold;

int timetoken = 9;
int cagetoken = 0;
float currenttemp;
float currenthumid;
const char* ws_baseurl            = "/chat/"; // don't forget leading and trailing "/" !!!

char MACADD[200] = {0,}; // MAC주소

const char* ntpServer1 = "pool.ntp.org";
const char* ntpServer2 = "time.nist.gov";
const long  gmtOffset_sec = 3600;
const int   daylightOffset_sec = 3600;
struct tm timeinfo;
const char* time_zone = "KST-9"; 

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length);
void subscribeToChannel(String _channelName);
void processJsonData(String _received);
void connectToWifi();
void sendMessage(String _channelName, String _username, String _messageText, String _messageType);
void HTTP_CREATE_CAGE(String _token, String _name, String _MAC);
void HTTP_SET_CAGEINFO(String _token, String _tempset, String _humidset, String _lampstart, String _lampstop, String _pumpstart, String _pumphold);
void HTTP_CURRENT_DATA(String _token, String _temp, String _humid, String _lamp_state);
void HTTP_LAMPSTATE_DATA(String _token, String _state);
void HTTP_1HOUR_DATA(String _token, String _temp, String _humid, String _time);
void printLocalTime();
void timeavailable(struct timeval *t);
void HW_SETTING();
void HDC_START();
void RELAY_START();
void READ_HDC();


void HDC_START(){
  Wire.begin();
  Wire.setClock(400000); //set clock speed for I2C bus to maximum allowed for HDC1080
  tempsensor = HDC1080JS();
  tempsensor.config();
}

void RELAY_START(){
  pinMode(RELAY4_1, OUTPUT);
  pinMode(RELAY4_2, OUTPUT);
  pinMode(RELAY4_3, OUTPUT);
  pinMode(RELAY4_4, OUTPUT);
  pinMode(RELAY2_1, OUTPUT);
  pinMode(RELAY2_2, OUTPUT);

  digitalWrite(RELAY4_1, HIGH);
  digitalWrite(RELAY4_2, HIGH);
  digitalWrite(RELAY4_3, HIGH);
  digitalWrite(RELAY4_4, HIGH);
  digitalWrite(RELAY2_1, HIGH);
  digitalWrite(RELAY2_2, HIGH);
}

void READ_HDC(){
  tempsensor.readTempHumid();
  currenttemp = tempsensor.getTemp();
  currenthumid = tempsensor.getRelativeHumidity();
}

void printLocalTime(){ // 현재 시간 받아오기
  if(!getLocalTime(&timeinfo)){
    Serial.println("No time available (yet)");
    return;
  }
  //Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
  //timestamp = tm_yday + '-' + tm_mon + '-' + tm_mday + 'T' + tm_hour + ':' + tm_min + ':' tm_sec;

}

void timeavailable(struct timeval *t){ // 현재 
  Serial.println("Got time adjustment from NTP!");
  printLocalTime();
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.printf("[WSc] Disconnected!\n");
      break;
    case WStype_CONNECTED:
      {
        Serial.printf("[WSc] Connected to url: %s\n",  payload);
      }
      break;
    case WStype_TEXT:
      {
        String text = (char*) payload;

        if (payload[0] == 'h');
        else if (payload[0] == 'o') {

          // on open connection
          char *msg = "[\"CONNECT\\naccept-version:1.1,1.0\\nheart-beat:10000,10000\\n\\n\\u0000\"]";
          webSocket.sendTXT(msg);
          delay(1000);


        } else if (text.startsWith("a[\"CONNECTED")) {
          // subscribe to some channels
          subscribeToChannel(CreateCage);
          delay(1000);
          subscribeToChannel(TargetValue);
          delay(1000);
          subscribeToChannel(ChangeLampState);
          delay(1000);
          Serial.printf("Subscribe complete!");
        }
        else if (text.startsWith("a[\"MESSAGE")) {
          processJsonData(text);
        }
        break;
      }
    case WStype_BIN:
      Serial.printf("[WSc] get binary length: %u\n", length);
      break;
  }
}


void subscribeToChannel(String _channelName) {
  String msg = "[\"SUBSCRIBE\\nid:sub-0\\ndestination:/topic/messages/" + _channelName + "\\n\\n\\u0000\"]";
  webSocket.sendTXT(msg);
}

void sendMessage(String _channelName, String _username, String _messageText, String _messageType) {
  String messageData =  "[\"SEND\\ndestination:/app/chat/" + _channelName 
                        + "\\n\\n{\\\"username\\\":\\\"" + _username 
                        + "\\\",\\\"message\\\":\\\"" + _messageText
                        + "\\\",\\\"messageType\\\":\\\"" + _messageType 
                        + "\\\"}\\u0000\"]";
  Serial.println(messageData);
  webSocket.sendTXT(messageData);
}

String extractString(String _received) {
  char startingChar = '{';
  char finishingChar = '}';

  String tmpData = "";
  bool _flag = false;
  for (int i = 0; i < _received.length(); i++) {
    char tmpChar = _received[i];
    if (tmpChar == startingChar) {
      tmpData += startingChar;
      _flag = true;
    }
    else if (tmpChar == finishingChar) {
      tmpData += finishingChar;
      break;
    }
    else if (_flag == true) {
      tmpData += tmpChar;
    }
  }
  return tmpData;
}

void processJsonData(String _received) {
  String json = extractString(_received);
  json.replace("\\", "");
  Serial.print("Arrived from Server : ");
  Serial.println(json);
  DynamicJsonDocument doc(1024);
  deserializeJson(doc, json);
  JsonObject obj        = doc.as<JsonObject>();

  int index1  = json.indexOf("token");      Serial.printf("token 위치 : %d\r\n", index1);
  int index2  = json.indexOf("id");         Serial.printf("id 위치 : %d\r\n", index2);
  int index3  = json.indexOf("name");       Serial.printf("name 위치 : %d\r\n", index3);
  int index4  = json.indexOf("temp");       Serial.printf("temp 위치 : %d\r\n", index4);
  int index5  = json.indexOf("humid");      Serial.printf("humid 위치 : %d\r\n", index5);
  int index6  = json.indexOf("lamp_start"); Serial.printf("lamp_start 위치 : %d\r\n", index6);
  int index7  = json.indexOf("lamp_stop");  Serial.printf("lamp_stop 위치 : %d\r\n", index7);
  int index8  = json.indexOf("pump_start"); Serial.printf("pump_start 위치 : %d\r\n", index8);
  int index9  = json.indexOf("pump_hold");  Serial.printf("pump_hold 위치 : %d\r\n", index9);
  int index10 = json.indexOf("state");      Serial.printf("state 위치 : %d\r\n\n", index10);

  if(index1  > 0)  { String jtoken     = obj["token"];      token     = jtoken;     Serial.print("token     : "); Serial.println(jtoken);         }   // 사용자 토큰
  if(index2  > 0)  { String jid        = obj["id"];         userid    = jid;        Serial.print("userID    : "); Serial.println(jid);            }   // 사용자 ID
  if(index3  > 0)  { String jname      = obj["name"];       cagename  = jname;      Serial.print("cagename  : "); Serial.println(jname);          }   // 사육장 이름
  if(index4  > 0)  { String jtemp      = obj["temp"];       tempset   = jtemp;      Serial.print("tempset   : "); Serial.println(jtemp);          }   // 온도 설정값
  if(index5  > 0)  { String jhumid     = obj["humid"];      humidset  = jhumid;     Serial.print("humidset  : "); Serial.println(jhumid);         }   // 습도 설정
  if(index6  > 0)  { String jlampstart = obj["lamp_start"]; lampstart = jlampstart; Serial.print("lampstart : "); Serial.println(jlampstart);     }   // 조명 시작 시간
  if(index7  > 0)  { String jlampstop  = obj["lamp_stop"];  lampstop  = jlampstop;  Serial.print("lampstop  : "); Serial.println(jlampstop);      }   // 조명 종료 시간
  if(index8  > 0)  { String jpumpstart = obj["pump_start"]; pumpstart = jpumpstart; Serial.print("pumpstart : "); Serial.println(jpumpstart);     }   // 펌프 시작 시간
  if(index9  > 0)  { String jpumphold  = obj["pump_hold"];  pumphold  = jpumphold;  Serial.print("pumphold  : "); Serial.println(jpumphold);      }   // 펌프 가동 시간
  if(index10 > 0)  { String jlampstate = obj["state"];      lampstate = jlampstate; Serial.print("lampstate : "); Serial.println(jlampstate);     }   // 조명 작동 상태

  if     (index3  > 0) { HTTP_CREATE_CAGE(token,cagename, MACADD); }
  else if(index4  > 0) { 
    HTTP_SET_CAGEINFO(token, tempset, humidset, lampstart, lampstop, pumpstart, pumphold); 
    String hh_start = lampstart.substring(11,13); Serial.println(hh_start);
    String mm_start = lampstart.substring(14,16); Serial.println(mm_start);
    String hh_stop  = lampstop.substring(11,13);  Serial.println(hh_stop);
    String mm_stop  = lampstop.substring(14,16);  Serial.println(mm_stop);

    String hh_pstar = pumpstart.substring(11,13); Serial.println(hh_pstar);
    String mm_pstar = pumpstart.substring(14,16); Serial.println(mm_pstar);

    h_start = hh_start.toInt();
    m_start = mm_start.toInt();
    h_stop  = hh_stop.toInt();
    m_stop  = mm_stop.toInt();

    h_pstar = hh_pstar.toInt();
    m_pstar = mm_pstar.toInt();

    tempsetting = tempset.toFloat();
    humidsetting = humidset.toFloat();
    pumpholdsec = pumphold.toInt();

    TIME_CALC(pumpholdsec);
    Serial.printf("result : %d:%d:%d",h_hold,m_hold,s_hold);
    }
  else if(index10 > 0) { HTTP_LAMPSTATE_DATA(token, lampstate); }
}

void connectToWifi() {
  delay(500);
  Serial.print("Logging into WLAN: "); Serial.print(wlan_ssid); Serial.print(" ...");
  WiFi.mode(WIFI_STA);
  WiFi.begin(wlan_ssid, wlan_password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" success.");
  Serial.print("IP: "); Serial.println(WiFi.localIP());
}

void connectToWebSocket() {
  String socketUrl = ws_baseurl;
  socketUrl += random(0, 999);
  socketUrl += "/";
  socketUrl += random(0, 999999); // should be a random string, but this works (see )
  socketUrl += "/websocket/";

  printurl = ws_host + String(ws_port) + socketUrl;
  Serial.println(ws_host + String(ws_port) + socketUrl);

  // connect to websocket
  webSocket.begin(ws_host, ws_port, socketUrl);
  webSocket.setExtraHeaders();
  //    webSocket.setExtraHeaders("foo: I am so funny\r\nbar: not"); // some headers, in case you feel funny
  webSocket.onEvent(webSocketEvent);
}

void HTTP_CREATE_CAGE(String _token, String _name, String _MAC){
  String buf  = "{\"token\":";
         buf += "\""+ _token + "\"";
         buf += ",\"cage_name\":";
         buf += "\""+_name + "\"";
         buf += ",\"serial\":";
         buf += "\""+_MAC + "\"";
         buf += "}";
  myHTTP.begin("http://www.rats-lh.com:8080/api/cage/createCage");
  myHTTP.addHeader("Content-Type", "application/json");
  int httpResponseCode = myHTTP.POST(buf);
  String response = myHTTP.getString();
  Serial.print("Send to server : ");
  Serial.println(buf);
  Serial.printf("create cage data : ");
  Serial.println(httpResponseCode);
  //Serial.println(response);
}

void HTTP_SET_CAGEINFO(String _token, String _tempset, String _humidset, String _lampstart, String _lampstop, String _pumpstart, String _pumphold){
  String buf  = "{\"token\":";
         buf += "\""+ _token + "\"";  
         buf += ",\"temp\":";
         buf += "\""+_tempset + "\"";
         buf += ",\"humid\":";
         buf += "\""+_humidset + "\"";
         buf += ",\"lamp_start\":";
         buf += "\""+_lampstart + "\"";
         buf += ",\"lamp_stop\":";
         buf += "\""+_lampstop + "\"";
         buf += ",\"pump_start\":";
         buf += "\""+_pumpstart + "\"";
         buf += ",\"pump_hold\":";
         buf += "\""+_pumphold + "\"";
         buf += "}";
  myHTTP.begin("http://www.rats-lh.com:8080/api/cage/setCageInfo");
  myHTTP.addHeader("Content-Type", "application/json");
  int httpResponseCode = myHTTP.PUT(buf);
  String response = myHTTP.getString();
  Serial.print("Send to server : ");
  Serial.println(buf);
  Serial.printf("changeinfo data : ");
  Serial.println(httpResponseCode);
  //Serial.println(response);
}

void HTTP_CURRENT_DATA(String _token, String _temp, String _humid, String _lamp_state){
  String buf  = "{\"token\":";
         buf += "\""+ _token + "\"";
         buf += ",\"current_temp\":";
         buf += "\""+_temp + "\"";
         buf += ",\"current_humid\":";
         buf += "\""+_humid + "\"";
         buf += ",\"lamp_state\":";
         buf += "\""+_lamp_state + "\"";
         buf += "}";  
  myHTTP.begin("http://www.rats-lh.com:8080/api/cage/setCurrentData");
  myHTTP.addHeader("Content-Type", "application/json");
  int httpResponseCode = myHTTP.PUT(buf);
  String response = myHTTP.getString();
  Serial.print("Send to server : ");
  Serial.println(buf);
  Serial.printf("10sec data : ");
  Serial.println(httpResponseCode);
  //Serial.println(response);
}

void HTTP_LAMPSTATE_DATA(String _token, String _state){
  String buf  = "{\"token\":";
         buf += "\""+ _token + "\"";
         buf += ",\"state\":";
         buf += "\""+_state + "\"";
         buf += "}";
  myHTTP.begin("http://www.rats-lh.com:8080/api/cage/setLampState");
  myHTTP.addHeader("Content-Type", "application/json");
  int httpResponseCode = myHTTP.PUT(buf);
  String response = myHTTP.getString();
  Serial.print("Send to server : ");
  Serial.println(buf);
  Serial.printf("lampstate data : ");
  Serial.println(httpResponseCode);
  //Serial.println(response);
}

void HTTP_1HOUR_DATA(String _token, String _MAC, String _time, String _temp, String _humid){
  String buf  = "{\"token\":";
         buf += "\""+ _token + "\"";
         buf += ",\"serial\":";
         buf += "\""+_MAC + "\"";
         buf += ",\"time\":";
         buf += "\""+_time + "\"";
         buf += ",\"temp\":";
         buf += "\""+_temp + "\"";
         buf += ",\"humid\":";
         buf += "\""+_humid + "\"";
         buf += "}";
         
  myHTTP.begin("http://www.rats-lh.com:8080/api/cage/putCageData");
  myHTTP.addHeader("Content-Type", "application/json");
  int httpResponseCode = myHTTP.POST(buf);
  String response = myHTTP.getString();
  Serial.print("Send to server : ");
  Serial.println(buf);
  Serial.printf("1hour data : ");
  Serial.println(httpResponseCode);
  //Serial.println(response);
}

void GET_MAC(){
  uint8_t mac[8];
  esp_efuse_mac_get_default(mac);
  snprintf(MACADD, sizeof(MACADD), "%02x-%02x-%02x-%02x-%02x-%02x", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
  printf("%s\r\n",MACADD);
}

void HW_SETTING(){
  READ_HDC();
  if(timeinfo.tm_hour == h_start && timeinfo.tm_min == m_start) {
    digitalWrite(RELAY2_2, LOW);
    lampstate2 = "true";
  }
  else if(timeinfo.tm_hour == h_stop && timeinfo.tm_min == m_stop){
    digitalWrite(RELAY2_2, HIGH);
    lampstate2 = "false";
  }
  if(lampstate == "false"){
    digitalWrite(RELAY2_2,LOW);
    lampstate2 = "true";
  }
  else if(lampstate == "true"){
    digitalWrite(RELAY2_2,HIGH);
    lampstate2 = "false";
  }
  if(tempsetting - 2 > currenttemp){
    digitalWrite(RELAY2_1, LOW);
  }
  else if(tempsetting < currenttemp){
    digitalWrite(RELAY2_1, HIGH);
  }
  if(timeinfo.tm_hour == h_pstar && timeinfo.tm_min == m_pstar && timeinfo.tm_sec == 0){
    digitalWrite(RELAY4_2, LOW);
    while(1){
      if(timeinfo.tm_hour == h_hold && timeinfo.tm_min == m_hold && timeinfo.tm_sec == s_hold) {
        digitalWrite(RELAY4_2, HIGH);
        break;
      }
    }    
  }
}

void TIME_CALC(int _pumpsec){
  int cal_m = _pumpsec/60;
  int cal_s = _pumpsec%60;
  h_hold = h_pstar;
  m_hold = m_pstar + cal_m;
  s_hold = cal_s;

  if(m_hold >= 60){
    int cal_h  = m_hold / 60;
    int cal_m2 = m_hold %60;

    h_hold = h_pstar + cal_h;
    m_hold = cal_m2;

    if(h_hold > 23){
      h_hold %= 24;
    }
  }
}

void setup() {
  Serial.begin(115200);
  GET_MAC(); // MAC 주소 반환
  connectToWifi();
  connectToWebSocket();
  Serial.println(printurl);

  sntp_set_time_sync_notification_cb( timeavailable );
  sntp_servermode_dhcp(1);    // (optional)
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer1, ntpServer2);
  configTzTime(time_zone, ntpServer1, ntpServer2);

  HDC_START();


  RELAY_START();

  timetoken = 1;
}

void loop() {
  webSocket.loop();
  HW_SETTING();

  if(token != NULL){
    
    if(millis() - lastMS > 5000){
      READ_HDC();
      printLocalTime();
      lastMS = millis();

      char tempbuf[20];
      snprintf(tempbuf, sizeof(tempbuf), "%.2f", currenttemp);

      char humidbuf[20];
      snprintf(humidbuf, sizeof(humidbuf), "%.2f", currenthumid);

      HTTP_CURRENT_DATA(token, tempbuf, humidbuf, lampstate2);

    }
  }

  if(token != NULL){
    READ_HDC();
    while(timeinfo.tm_min == 0){
      if(timetoken == 0) {
        break;
      }
      char tempbuf[20];
      snprintf(tempbuf, sizeof(tempbuf), "%.2f", currenttemp);

      char humidbuf[20];
      snprintf(humidbuf, sizeof(humidbuf), "%.2f", currenthumid);

      char timebuf[20];
      snprintf(timebuf, sizeof(timebuf), "%04d-%02d-%02d %02d:%02d:%02d", timeinfo.tm_year+1900, timeinfo.tm_mon+1, timeinfo.tm_mday, timeinfo.tm_hour, timeinfo.tm_min, timeinfo.tm_sec);

      HTTP_1HOUR_DATA(token, MACADD, timebuf, tempbuf, humidbuf);

      timetoken = 0;
    }
    if(timeinfo.tm_min == 1) timetoken = 1;
  }
}