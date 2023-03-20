import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import {
  ArnFormat,
  Stack,
  CfnParameter,
  aws_iam as iam,
  aws_apigatewayv2 as apigw,
  aws_stepfunctions as sfn,
  aws_stepfunctions_tasks as tasks,
} from 'aws-cdk-lib'

interface WorkflowProps {
  WebhookUrl : CfnParameter,
}

export class Workflow extends Construct {
  constructor(scope: Construct, id: string, props: WorkflowProps) {
    super(scope, id);

    const api = new InteractionResponder(this, "InteractionResponder", {
      url: props.WebhookUrl.valueAsString,
    });

    new sfn.StateMachine(this, "StateMachine", {
      definition: new MyCallApiGatewayHttpApiEndpoint(this, "respond", {
        apiId: api.ref,
        apiStack: Stack.of(api),
        authType: tasks.AuthType.IAM_ROLE,
        method: tasks.HttpMethod.POST,
        requestBody: sfn.TaskInput.fromJsonPathAt("$"),
      }).next(new sfn.Succeed(this, "SUCCEED")),
    })

    

  }
}



class MyCallApiGatewayHttpApiEndpoint extends tasks.CallApiGatewayHttpApiEndpoint {

  protected readonly taskPolicies?: iam.PolicyStatement[] | undefined;
  protected readonly arnForExecuteApi: string;

  constructor(scope:Construct, id: string, props: tasks.CallApiGatewayHttpApiEndpointProps) {

    super(scope, id, props);

    const {apiStack, apiId, stageName, method, apiPath} = props;

    this.arnForExecuteApi = apiStack.formatArn({
      service: 'execute-api',
      resource: apiId,
      arnFormat: ArnFormat.SLASH_RESOURCE_NAME,
      resourceName: `${stageName??"$default"}/${method}${apiPath??"/"}`
    });
    this.taskPolicies = super.createPolicyStatements();
  }
}


interface InteractionResponderProps {
  url: string
}

class InteractionResponder extends apigw.CfnApi {
  constructor(scope: Construct, id: string, props: InteractionResponderProps){
    super(scope, id, {
      name: "api",
      protocolType: "HTTP",
    });

    new apigw.CfnStage(this, "stage", {
      apiId: this.ref,
      stageName: "$default",
      autoDeploy: true,
    });

    const integration = new apigw.CfnIntegration(this, "integration", {
      apiId: this.ref,
      integrationType: "HTTP_PROXY",
      integrationMethod: "ANY",
      integrationUri: props.url,
      payloadFormatVersion: "1.0",
      requestParameters: {
        "overwrite:header.User-Agent": "DiscordBot (app://my-bot, 0.0.1)",
        "overwrite:header.Content-Type": "application/json",
      },
    });

    new apigw.CfnRoute(this, "route", {
      apiId: this.ref,
      routeKey: "ANY /",
      authorizationType: "AWS_IAM",
      target: `integrations/${integration.ref}`,
    });
  }
}

