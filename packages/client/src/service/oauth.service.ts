import { setError } from 'reducers/error';
import store from 'store';
import {type User, type Nullable} from "../types/types"
import { BASE_URL, REDIRECT_URL } from '../utils/constants'


class OAuthService {
    baseURL: string = BASE_URL;
    //redirectUrl = 'https://localhost:3001/oauth'
    redirectUrl = REDIRECT_URL
    
    async getClientID() {
        try {
            const response: Response = await fetch(this.baseURL + '/oauth/yandex/service-id', {
              method: 'GET'
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result: any = await response?.json()
            return result.service_id;
          } catch (error) {
            if (error instanceof Error) 
              store.dispatch(setError(error.message))
          }
    }

    async redirectYandexUrl(): Promise<string>{
        try{
            const clientId = await this.getClientID();
            return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${this.redirectUrl}`;
        } catch (error){
          if (error instanceof Error)  store.dispatch(setError(error.message));
            return location.pathname;
        }

    }


    async executeOAuth(code: string): Promise<Nullable<User>> {
      if(!code){
        return null;
      }
      const data = {code: code};
      console.log(data)
      console.log(JSON.stringify(data))
      try {
        const response: Response = await fetch(this.baseURL + '/oauth/yandex', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await response?.json()
        return result;
      } catch (error) {
        if (error instanceof Error) 
          return null;
      }
      return null;
    }




}

export default new OAuthService();
