import type {UserInfo} from './UserInfo'
import * as Faker from './Random'
import * as Util from './util'

export const createUserInfo = (): UserInfo => {
    const name = Faker.randomName()
    return {
      name,
      email: Faker.randomEmail(),
      username: Faker.randomUsername(),
      password: Faker.randomPassword(),
      createdDate: Faker.randomDate(),  
      profileImage: Faker.randomImage(),
      avatar: Faker.randomAvatarUrl(name),
    }
  }