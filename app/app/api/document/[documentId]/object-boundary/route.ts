import { getVercelOidcToken } from "@vercel/functions/oidc";
import { ExternalAccountClient } from "google-auth-library";

const GCP_SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID =
  process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;
// const AI_API_SERVICE_URI = process.env.AI_API_SERVICE_URI;

export const GET = async () => {
  const authClient = ExternalAccountClient.fromJSON({
    type: "external_account",
    audience: `//iam.googleapis.com/${GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
    subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
    token_url: "https://sts.googleapis.com/v1/token",
    service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
    subject_token_supplier: {
      // Use the Vercel OIDC token as the subject token
      getSubjectToken: getVercelOidcToken,
    },
  });
  // const response = await client.request({
  //   url: `${AI_API_SERVICE_URI}`,
  // });
  await authClient?.getAccessToken();
  return Response.json({});
};
