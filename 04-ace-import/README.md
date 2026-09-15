# 4b · Understand an existing ACE project

Import a real App Connect Enterprise project into Bob and have it explained to you.

## What are we looking at?

The `cip-util-kafka-producer` project is a REST API implemented in ACE that publishes messages to Kafka topics. It was developed internally at HLAG and serves as an alternative to tools like Kadeck for sending test messages to Kafka topics.

- An **HTTP endpoint** (`POST /kafkaproducer/v1/message/{topic}`) accepts a message and forwards it to a freely chosen Kafka topic.
- **Kafka headers** (up to 5 name/value pairs) can be passed via HTTP request headers.
- The logic is split across two ACE projects: **KafkaProducer** (message flow + ESQL) and **KafkaProducerJava** (Java Compute Node).
- A shared library (`lib/cip-ace-common`) provides logging, error handling, and utility routines.
- Deployment configuration for Kubernetes (OpenShift / CP4I) lives in `integrationServers/` and `bar-override-properties/`.

## Task: import the workspace and have it explained

1. Open the folder `C:\hlag\bob\bob-a-thon\04-ace-import\cip-util-kafka-producer` as a workspace in Bob.
2. Select the **ACE Developer** mode.
3. Ask Bob one or more of the following questions:

   > Explain what this ACE project does. Cover the message flow, the Java Compute Node, and the shared library.

   > Describe the path of an incoming HTTP request through the message flow all the way to the Kafka topic. Where are the Kafka headers set?

   > What configuration is required for the Kubernetes deployment, and what does the BAR override properties file do?

   > What is the role of the `CreateKafkaHeaders` Java node, and why is it used in addition to ESQL?

## Project structure at a glance

| Path | Contents |
|---|---|
| `KafkaProducer/` | REST API project: OpenAPI spec, generated message flow, ESQL module |
| `KafkaProducer/kafka-producer-1.0.0.yaml` | OpenAPI 3.0 definition of the endpoint |
| `KafkaProducer/gen/KafkaProducer.msgflow` | Generated message flow |
| `KafkaProducer/postTopic_SetDebug.esql` | ESQL Compute module (sets debug flag) |
| `KafkaProducerJava/` | Java project: `CreateKafkaHeaders` node |
| `lib/cip-ace-common/` | Shared library (logging, error handling, utilities) |
| `integrationServers/` | Kubernetes `IntegrationServer` CR for CP4I deployment |
| `bar-override-properties/` | BAR override for the API security profile |

## What Bob can show you

Bob can explain the complete message flow without ACE being installed. It reads the ESQL, Java, and flow files directly and can:

- walk through the full path from HTTP ingress to Kafka publish step by step,
- explain how Kafka headers are extracted from HTTP headers and set on the outgoing message,
- put the Common Library subflows (`error_handling`, `logging`, `StatusHandling`) into context,
- explain the Kubernetes deployment manifest and the BAR override properties.

**Done when:** Bob has explained the end-to-end flow and you know where in the code the Kafka topic assignment and header construction take place.

[Back to workshop overview](../README.md)
