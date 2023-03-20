import { CfnParameter, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { InteractionEndpoint } from './InteractionEndpoint/interaction_endpoint-construct';
import { Workflow } from './Workflow/workflow-construct';

export class DiscordAppAzechi01Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new InteractionEndpoint(this, 'interactionendpoint', {
      PublicKey: new CfnParameter(this, "PublicKey")
    });

    new Workflow(this, 'workflow', {
      WebhookUrl: new CfnParameter(this, "WebhookUrl")
    });
  }
}

