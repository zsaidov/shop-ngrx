const {createServer: createServer} = require("http");

function checkMethod(e) {
    if (!["GET", "POST", "PUT", "DELETE", "PATCH"].includes(e)) throw new Error("invalid method")
}

function checkPath(e) {
    if ("string" != typeof e) {
        if (!(e instanceof RegExp)) throw new Error("path must be string or RegExp");
        if (!e.source.startsWith("^\\/") || !e.source.endsWith("$")) throw new Error("path must start with ^/ and ends with $")
    } else if (!e.startsWith("/")) throw new Error("path must start with /")
}

class RegexRouter {
    constructor() {
        this.routes = new Map, this.middlewares = [], this.notFoundHandler = ((e, t) => {
            t.statusCode = 404, t.end(JSON.stringify({error: "Not found"}))
        }), this.internalErrorHandler = ((t, s) => {
            s.statusCode = 500, s.end(JSON.stringify({error: e.message}))
        })
    }

    use(e) {
        this.middlewares.push(e), this.notFoundHandler = e(this.notFoundHandler), this.internalErrorHandler = e(this.internalErrorHandler)
    }

    register(e, t, s, ...r) {
        checkMethod(e), checkPath(t), s = r.reduce((e, t) => t(e), s), s = this.middlewares.reduce((e, t) => t(e), s), this.routes.has(e) ? this.routes.get(e).set(t, s) : this.routes.set(e, new Map([[t, s]]))
    }

    handle(e, t) {
        if (!this.routes.has(e.method)) return void this.notFoundHandler(e, t);
        const s = [...this.routes.get(e.method).entries()].find(([t, s]) => "string" == typeof t ? t === e.url : t.test(e.url));
        if (void 0 === s) return void this.notFoundHandler(e, t);
        const [r, i] = s;
        try {
            r instanceof RegExp && (e.matches = r.exec(e.url), e.matches.id = e.matches["1"]), i(e, t)
        } catch (s) {
            this.internalErrorHandler(e, t)
        }
    }
}

const cors = e => (t, s) => {
    if (!t.headers.origin) return void e(t, s);
    const r = {"access-control-allow-origin": "*"};
    if ("OPTIONS" !== t.method) {
        Object.entries(r).forEach(([e, t]) => s.setHeader(e, t));
        try {
            return void e(t, s)
        } catch (e) {
            throw e.headers = {...e.headers, ...r}, e
        }
    }
    t.headers["access-control-request-method"] && (Object.entries({
        ...r,
        "access-control-allow-methods": "GET, POST, PUT, DELETE, PATCH"
    }).forEach(([e, t]) => s.setHeader(e, t)), t.headers["access-control-request-headers"] && s.setHeader("access-control-allow-headers", t.headers["access-control-request-headers"]), s.statusCode = 204, s.end())
}, slow = e => (t, s) => {
    setTimeout(() => {
        e(t, s)
    }, 5e3)
}, log = e => (t, s) => {
    console.info(`incoming request: ${t.method} ${t.url}`), e(t, s)
}, json = e => (t, s) => {
    const r = [];
    t.on("data", e => {
        r.push(e)
    }), t.on("end", () => {
        t.body = JSON.parse(Buffer.concat(r).toString()), console.info(t.body), e(t, s)
    })
}, router = new RegexRouter;
router.use(log), router.use(cors);
{
    let e = 1, t = [];
    router.register("GET", "/api/products", (e, s) => {
        s.setHeader("Content-Type", "application/json"), s.end(JSON.stringify(t))
    }, slow), router.register("POST", "/api/products", (s, r) => {
        const i = s.body;
        i.id = e++, t = [i, ...t], r.setHeader("Content-Type", "application/json"), r.end(JSON.stringify(i))
    }, json, slow), router.register("DELETE", /^\/api\/products\/(\d+)$/, (e, s) => {///^\/api\/hw32\/posts\/(\d+)$/
        const r = Number(e.matches.id);
        if (Number.isNaN(r)) return s.statusCode = 400, void s.end(JSON.stringify({error: "bad id"}));
        t = t.filter(e => e.id !== r), s.statusCode = 204, s.end()
    }, slow), router.register("PUT", /^\/api\/products\/(\d+)$/, (e, s) => {
        const r = Number(e.matches.id);
        if (Number.isNaN(r)) return s.statusCode = 400, void s.end(JSON.stringify({error: "bad id"}));
        t = t.map(e => e.id !== r ? e : {...e, likes: 1}), s.statusCode = 204, s.end()
    }, slow), router.register("DELETE", /^\/api\/products\/(\d+)\/likes$/, (e, s) => {
        const r = Number(e.matches.id);
        if (Number.isNaN(r)) return s.statusCode = 400, void s.end(JSON.stringify({error: "bad id"}));
        t = t.map(e => e.id !== r ? e : {...e, likes: e.likes - 1}), s.statusCode = 204, s.end()
    }, slow)
}
const server = createServer((e, t) => router.handle(e, t));
server.listen(8080, () => {
    console.info("server started at http://127.0.0.1:8080")
});
