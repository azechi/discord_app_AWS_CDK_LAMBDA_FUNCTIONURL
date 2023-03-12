import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { InteractionEndpoint } from './InteractionEndpoint/interaction_endpoint-construct';

export class DiscordAppAzechi01Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new InteractionEndpoint(this, 'interactionendpoint', {});
  }
}

