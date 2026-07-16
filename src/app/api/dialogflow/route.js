import { SessionsClient } from "@google-cloud/dialogflow";
import { NextResponse } from "next/server";

const getEnv = (key) => process.env[key];

export async function POST(request) {
  try {
    const body = await request.json();
    const query = body?.query;

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "Invalid query" },
        { status: 400 }
      );
    }

    const projectId = getEnv("GOOGLE_PROJECT_ID");
    const clientEmail = getEnv("GOOGLE_CLIENT_EMAIL");
    const privateKey = getEnv("GOOGLE_PRIVATE_KEY")?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      console.error("Missing Dialogflow environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const sessionClient = new SessionsClient({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      projectId,
    });

    const sessionId = `session-${Date.now()}`;
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    const dialogflowRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query.trim(),
          languageCode: "en-US",
        },
      },
    };

    const [response] = await sessionClient.detectIntent(dialogflowRequest);
    const result = response?.queryResult;

    return NextResponse.json({
      response: result?.fulfillmentText || "No response from Dialogflow",
    });
  } catch (error) {
    console.error("Dialogflow error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}