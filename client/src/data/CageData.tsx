export type CData = {
    current_temp: number,
    current_humid: number,
    lampOn: boolean,

    max_temp: number,
    min_temp: number,

    start_temp: Date,
    end_temp: Date,

    max_humid: number,
    min_humid: number,

    sprinkle_time: number,
    standard_humid: number,

    start_pump: Date,
    end_pump: Date,

    start_lamp: Date,
    end_lamp: Date,

    mode: string
}