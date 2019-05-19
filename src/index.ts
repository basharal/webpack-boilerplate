import "./landing";
import * as hello from "./api/hello";

let h = hello.snippets.HelloRequest.create({ name: "foo" });
console.log(h.toJSON());
