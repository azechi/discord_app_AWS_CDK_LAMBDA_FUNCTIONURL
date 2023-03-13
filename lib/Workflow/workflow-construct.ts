import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';

interface WorkflowProps {}

export class Workflow extends Construct {
  constructor(scope: Construct, id: string, _: WorkflowProps) {
    super(scope, id);

    new CfnOutput(this, "OUTPUT test", {value:"value1"});

  }
}


