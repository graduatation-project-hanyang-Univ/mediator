import { Expose, Type } from 'class-transformer'
import { Equals, IsArray, ValidateNested, IsString, IsEnum } from 'class-validator'
import { Verkey } from 'indy-sdk'

import { AgentMessage } from '../../../agent/AgentMessage'

import { KeylistUpdateAction } from './KeylistUpdateMessage'

export interface KeylistUpdateResponseMessageOptions {
  id?: string
  updated: KeylistUpdated[]
}

/**
 * Used to notify an edge agent with the result of updating the routing keys in the mediator.
 *
 * @see https://github.com/hyperledger/aries-rfcs/blob/master/features/0211-route-coordination/README.md#keylist-update-response
 */
export class KeylistUpdateResponseMessage extends AgentMessage {
  public constructor(options: KeylistUpdateResponseMessageOptions) {
    super()

    if (options) {
      this.id = options.id || this.generateId()
      this.updated = options.updated
    }
  }

  @Equals(KeylistUpdateResponseMessage.type)
  public readonly type = KeylistUpdateResponseMessage.type
  public static readonly type = 'https://didcomm.org/coordinatemediation/1.0/keylist-update-response'

  @Type(() => KeylistUpdated)
  @IsArray()
  @ValidateNested()
  public updated!: KeylistUpdated[]
}

export enum KeylistUpdateResult {
  ClientError = 'client_error',
  ServerError = 'server_error',
  NoChange = 'no_change',
  Success = 'success',
}

export class KeylistUpdated {
  public constructor(options: { recipientKey: Verkey; action: KeylistUpdateAction; result: KeylistUpdateResult }) {
    if (options) {
      this.recipientKey = options.recipientKey
      this.action = options.action
    }
  }

  @IsString()
  @Expose({ name: 'recipient_key' })
  public recipientKey!: Verkey

  @IsEnum(KeylistUpdateAction)
  public action!: KeylistUpdateAction

  @IsEnum(KeylistUpdateResult)
  public result!: KeylistUpdateResult
}
