import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as go from '@aws-cdk/aws-lambda-go-alpha'
import { Architecture, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';

export class DiscordAppAzechi01Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new InteractionEndpoint(this, 'interactionendpoint', {});
  }
}

interface InteractionEndpointProps {}

class InteractionEndpoint extends Construct {
  constructor(scope: Construct, id: string, _: InteractionEndpointProps) {
    super(scope, id);

    const lambda = new go.GoFunction(this, 'handler',{
      entry: "lib/InteractionEndpoint",
      architecture: Architecture.ARM_64,
      memorySize: 128,
    });

    lambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE
    });

  }
}


