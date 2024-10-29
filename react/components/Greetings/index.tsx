import React from 'react'
import axios from "axios";
import { useCookies } from 'react-cookie';


import { useRenderSession } from "vtex.session-client";
import { canUseDOM } from 'vtex.render-runtime'



function Greeting() {

  const [cookies, setCookie] = useCookies(['cms_landing_type']);

  console.log(cookies);

  function defineBodyClass(isPolishop: boolean) {
    isPolishop ? document.body.classList.add('testeclass788') : document.body.classList.add('testeclass799');
  }

  if (canUseDOM) {

    const landingOrigin = window.location.pathname === '/polishop' ? 'polishop' : 'normal';

    const { session } = useRenderSession();
    const sessionType: any = session;

    console.log('>> sessionzType');
    console.log(sessionType);


    if (sessionType?.namespaces?.profile?.isAuthenticated?.value === "true") {
      const profileId = sessionType?.namespaces?.profile?.id?.value;
      //const email = sessionType?.namespaces?.profile?.email?.value;
      axios(`/safedata/CL/documents/CL-${profileId}?_fields=isPolishop`, {
        method: "GET"
      }).then(({ data }) => {
        console.log('>>> data');
        if (data) {
          if (data.isPolishop === null) {

            return axios.patch(`/safedata/CL/documents/${profileId}`, {
              email: '',
              "isPolishop": cookies.cms_landing_type == 'polishop'
            }).then(() => {
              console.log('ALTERADO MD');
              defineBodyClass(data.isPolishop)
            })
            /* axios(`/safedata/CL/documents/CL-${profileId}`, {
              method: "PATCH",
              headers: { Accept: 'application/vnd.vtex.ds.v10+json', 'Content-Type': 'application/json' },
              data: JSON.stringify({
                id: profileId,
                email,
                "isPolishop": cookies.cms_landing_type == 'polishop'
              })
            }).then(() => {
              console.log('ALTERADO MD');
              defineBodyClass(data.isPolishop)
            }); */
          }
          defineBodyClass(data.isPolishop)
        }
        return defineBodyClass(false)
      });

      return <div>Yes Logged  <h1>type: {landingOrigin}</h1>  <h2>cookie: {cookies.cms_landing_type}</h2> </div>
    }

    setCookie('cms_landing_type', landingOrigin);

    return <div>Not logged   <h1>type: {landingOrigin}</h1>   <h2>cookie: {cookies.cms_landing_type}</h2> </div>

  }



  return <div>Loading...</div>
}

export default Greeting
