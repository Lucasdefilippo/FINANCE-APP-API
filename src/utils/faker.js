import { faker } from '@faker-js/faker'

export const fakeName = () => faker.person.firstName()

export const fakeLastName = () => faker.person.lastName()

export const fakeEmail = () => faker.internet.email()

export const fakeValidPassword = () => faker.internet.password({ length: 6 })

export const fakeInvalidPassword = () => faker.internet.password({ length: 5 })
