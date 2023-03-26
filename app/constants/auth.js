export const fetchUserFbData = (token) => {
    return fetch(
        `https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,email,birthday&access_token=${token}`
      )
}