import { Lambda } from 'aws-sdk'

const generatePayload = (input: any): Buffer => new Buffer(JSON.stringify(input))

export default function callLambda(name: string, region: string, payload: any): Promise<any> {
  const lambda = new Lambda({ apiVersion: 'latest', region })
  const lambdaDef: Lambda.Types.InvocationRequest = {
    FunctionName: name,
    Payload: generatePayload(payload),
    InvocationType: 'RequestResponse'
  }

  return lambda.invoke(lambdaDef).promise()
}
