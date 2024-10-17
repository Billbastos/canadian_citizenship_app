## Runing react-native (Metro) Locally

```bash
yarn install
yarn start
```

## Runing Expo

- Open another terminal
- `yarn run web`

## Building / Deploying to Expo

```bash
npm install -g eas-cli
eas login
```

### IOS

`eas build --platform ios`

### Android

`eas build --platform android`

## Troubleshooting

- Error on running Metro (dependency error)
  - Try `yarn cache clean --force && rm -fr node_modules package-lock.json && yarn install`
