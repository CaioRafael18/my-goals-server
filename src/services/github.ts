import { env } from '../env.ts'

interface AccessTokenResponse {
  access_token: string
}

export interface GetUserResponse {
  id: number
  name: string | null
  email: string | null
  avatar_url: string
}

export async function getAccessTokenFromCode(code: string): Promise<string> {
  const accessTokenUrl = new URL('https://github.com/login/oauth/access_token')

  accessTokenUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID)
  accessTokenUrl.searchParams.set('client_secret', env.GITHUB_CLIENT_SECRET)
  accessTokenUrl.searchParams.set('code', code)

  const response = await fetch(accessTokenUrl, {
    headers: {
      Accept: 'application/json',
    },
  })

  const { access_token } = (await response.json()) as AccessTokenResponse

  return access_token
}

export async function getUserFromAccessToken(
  accessToken: string
): Promise<GetUserResponse> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = (await response.json()) as GetUserResponse

  return data
}
