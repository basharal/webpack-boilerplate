import "./landing";
import * as hello from "./api/hello";

fetch("http://localhost:8082/v1/greeter").then(res => {
  res.json().then(body => {
    let h = hello.snippets.HelloReply.create(body);
    console.log(h.toJSON());
  });
});
