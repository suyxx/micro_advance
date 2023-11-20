// api/build-client.js

import axios from 'axios';

const buildClient = ({ req }) => {
  if (typeof window !== 'undefined') {
    // We are on the client side
    if(req){
        return axios.create({
            baseURL: '/',
            headers: req.headers,
        });
    }else{
        return axios.create({
            baseURL: '/',
          });
    }
  } else {
    // We are on the server side
    return axios.create({
        baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
        headers: req.headers,
      });
  }
};

export default buildClient;
