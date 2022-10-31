import type { BrowserActionDefinition } from '../../../lib/browser-destinations'
import type { Settings } from '../generated-types'
import { CommandBarClientSDK } from '../types'
import type { Payload } from './generated-types'

const action: BrowserActionDefinition<Settings, CommandBarClientSDK, Payload> = {
  title: 'Identify User',
  description: '',
  platform: 'web',
  fields: {
    userId: {
      type: 'string',
      required: true,
      description: "The user's id",
      label: 'User ID',
      default: {
        '@path': '$.userId'
      }
    },
    hmac: {
      description:
        'Identify users with an HMAC of their user ID; this enables end user customizable shortcuts and other features. [Learn about identity verification](https://app.commandbar.com/identity-verification).',
      label: 'HMAC',
      type: 'string',
      required: false,
      default: {
        '@path': '$.context.CommandBar.hmac'
      }
    },
    formFactor: {
      description:
        "Configures the way the bar is displayed. An 'inline' bar is always visible and hosted within an element on your page. A 'modal' bar will display in a modal dialog when open.",
      label: 'Event Metadata',
      type: 'object',
      required: false,
      default: {
        '@path': '$.context.CommandBar.formFactor'
      }
    },
    traits: {
      type: 'object',
      required: false,
      description: 'The Segment traits to be forwarded to CommandBar',
      label: 'Traits',
      default: {
        '@path': '$.traits'
      }
    }
  },
  perform: (CommandBar, event) => {
    const traits = event.payload.traits || {}

    CommandBar.boot(event.payload.userId, traits, { ...(!!event.payload.hmac && { hmac: event.payload.hmac }) })
  }
}

export default action
