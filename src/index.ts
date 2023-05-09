import {readFile} from 'node:fs/promises';
import {WASI} from 'node:wasi';
import {argv, env} from 'node:process';

(async () => {
    const wasi = new WASI({
        args: [...argv, 'dotnet-wasi'],
        env,
        preopens: {
            '/': 'C:\\',
        },
    });

    const importObject = {wasi_snapshot_preview1: wasi.wasiImport};
    const wasm = await WebAssembly.compile(await readFile('./bin/dotnet-wasi.wasm'),);
    const instance = await WebAssembly.instantiate(wasm, importObject);

    wasi.start(instance);
})();