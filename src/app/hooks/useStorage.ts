import {useEffect, useState} from 'react';

const AsyncStorage = window.localStorage;

export const useStorage = (store: any, KEY: string) => {
  let [state, setState] = useState(store);

  useEffect(() => {
    (async () => {
      setState(JSON.parse((await AsyncStorage.getItem(KEY)) || ''));
    })();
  }, [KEY, setState]);

  const newSetState = async (data: any) => {
    setState(data);
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  };

  return [state, newSetState];
};
