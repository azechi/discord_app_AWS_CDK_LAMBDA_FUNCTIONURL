import { Construct } from 'constructs';

import * as go from '@aws-cdk/aws-lambda-go-alpha'
import { Architecture, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
import { CfnParameter } from 'aws-cdk-lib';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';


interface InteractionEndpointProps {
  PublicKey: CfnParameter,
}

export class InteractionEndpoint extends Construct {
  constructor(scope: Construct, id: string, props: InteractionEndpointProps) {
    super(scope, id);

    const lambda = new go.GoFunction(this, 'handler',{
      entry: "lib/InteractionEndpoint",
      architecture: Architecture.ARM_64,
      memorySize: 128,
      environment: {
        "verifyKey": props.PublicKey.valueAsString, 
      },
      logRetention: RetentionDays.ONE_DAY,
    });

    lambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE
    });

  }
}


