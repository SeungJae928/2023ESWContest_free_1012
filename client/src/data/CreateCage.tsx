import type {CData} from './CageData'

export const createCage = (): CData => {
    const current_temp = 40
    const current_humid = 65
    const lampOn = false

    const max_temp = 50
    const min_temp = 30

    const start_temp = new Date()
    const end_temp = new Date()

    const max_humid = 90
    const min_humid = 40

    const sprinkle_time = 5
    const standard_humid = 65

    const start_pump= new Date()
    const end_pump= new Date()

    const start_lamp = new Date()
    const end_lamp = new Date()

    return {
        current_temp,
        current_humid,
        lampOn,
    
        max_temp,
        min_temp,
    
        start_temp,
        end_temp,
    
        max_humid,
        min_humid,
    
        sprinkle_time,
        standard_humid,
    
        start_pump,
        end_pump,
    
        start_lamp,
        end_lamp,
    }
  }