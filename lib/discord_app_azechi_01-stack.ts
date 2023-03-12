import { Duration, Stack, StackProps } from 'aws-cdk-lib';
//import * as sns from 'aws-cdk-lib/aws-sns';
//import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
//import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

import * as go from '@aws-cdk/aws-lambda-go-alpha'
import { Architecture } from 'aws-cdk-lib/aws-lambda';

export class DiscordAppAzechi01Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new go.GoFunction(this, 'handler',{
      entry: "lib/InteractionEndpoint",
      architecture: Architecture.ARM_64,
    });

  }
}
