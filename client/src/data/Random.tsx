import faker from 'faker'
import * as Util from './util'

export const randomUsername = (): string => faker.datatype.uuid()
export const randomName = (): string => faker.name.findName()
export const randomEmail = (): string => faker.internet.email()
export const randomPassword = (): string => faker.internet.password()
export const randomAvatarUrl = (name?: string): string =>
  Util.avatarUriByName(name ?? randomName())
export const randomDate = (): Date => faker.date.recent()
export const randomImage = (): string =>
  Util.unsplashUrl(Util.random(800, 1000), Util.random(800, 1000))