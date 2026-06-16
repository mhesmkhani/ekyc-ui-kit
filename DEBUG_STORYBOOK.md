# Debugging Storybook fetchIndex

If the manager shows:

```txt
Error at Object.fetchIndex
```

run:

```bash
npm run storybook:clean
npm run storybook:local
```

Open:

```txt
http://localhost:6006/index.json
```

Expected: JSON beginning with `{ "v": 5, "entries": ... }`.

If `localhost` works, stop it and run LAN mode:

```bash
npm run storybook:lan
```

Open from the same computer:

```txt
http://localhost:6006
```

Open from another device using the computer IP:

```txt
http://YOUR_LOCAL_IP:6006
```

If the UI still fails but `/index.json` is valid, clear browser site data for the Storybook URL or open an incognito/private window.

This package disables `reactDocgen` in `.storybook/main.ts` because complex polymorphic TypeScript components such as Text and Tooltip can make Storybook fail while generating the story index. Stories and docs pages still work; automatic props tables may be less detailed.
