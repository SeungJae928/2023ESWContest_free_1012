package com.example.Domabam.client;

import com.example.Domabam.domain.Provider;
import com.example.Domabam.domain.Role;
import com.example.Domabam.domain.User;
import com.example.Domabam.dto.KakaoUserDTO;
import com.example.Domabam.jwt.TokenValidFailedException;
import com.nimbusds.jose.shaded.gson.JsonElement;
import com.nimbusds.jose.shaded.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class ClientKakao implements ClientProxy{

    private final WebClient webClient;

    @Override
    public User getUserData(String accessToken) throws IOException {
//        KakaoUserDTO kakaoUserDTO = webClient.get()
//                .uri("https://kapi.kakao.com/v2/user/me")
//                .headers(h -> h.setBearerAuth(accessToken))
//                .retrieve()
//                .onStatus(HttpStatusCode::is4xxClientError, response -> Mono.error(new TokenValidFailedException("Social Access Token is unauthorized")))
//                .onStatus(HttpStatusCode::is5xxServerError, response -> Mono.error(new TokenValidFailedException("Internal Server Error")))
//                .bodyToMono(KakaoUserDTO.class)
//                .block();
//
//        return User.builder()
//                .provider_id(String.valueOf(kakaoUserDTO.getId()))
//                .name(kakaoUserDTO.getProperties().getName())
//                .email(kakaoUserDTO.getKakaoAccount().getEmail())
//                .role(Role.USER)
//                .createDate(LocalDateTime.now())
//                .provider(Provider.KAKAO)
//                .password("Test")
//                .provider_id(null)
//                .build();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        //access_token을 이용하여 사용자 정보 조회
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            String id = element.getAsJsonObject().get("id").getAsString();
            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
            String email = "";
            String name = element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();

            if(hasEmail){
                email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
            }

            System.out.println("id : " + id);
            System.out.println("한글 테스트");
            System.out.println(element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString());

            br.close();

            return User.builder()
                    .provider_id(id)
                    .role(Role.USER)
                    .name(name)
                    .password("Test")
                    .createDate(LocalDateTime.now())
                    .email(email)
                    .provider(Provider.KAKAO)
                    .build();

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
