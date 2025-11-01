export * from './response.dto'
export * from '../common/common.dto'

import type { UserSuccess, BlockUserHandlerSuccess, GenericError } from './'

export type UserResponse = UserSuccess | GenericError
export type BlockUserHandlerResponse = BlockUserHandlerSuccess | GenericError
