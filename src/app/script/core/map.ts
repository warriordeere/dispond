'use client'

export const coreMap = new class CORE_CLASS_MAP {

    private ttMapSDK: any | null = null;
    private ttServiceSDK: any | null = null;
    InternalMap: any | null = null;

    async loadMapSDK() {
        if (!this.ttMapSDK) {
            this.ttMapSDK = await import("@tomtom-international/web-sdk-maps");
        }
        return this.ttMapSDK;
    }

    async loadServiceSDK() {
        if (!this.ttServiceSDK) {
            this.ttServiceSDK = await import("@tomtom-international/web-sdk-services");
        }
        return this.ttServiceSDK;
    }

    setMapInstance(map: tt.Map) {
        this.InternalMap = map;
    }

    async init() {
        const tt = await this.loadMapSDK();

        const spawnPoint = (await fetch('api/v1/data/saves?filter=spawn'))
            .json()
            .then((r) => {
                return r[0] as [number, number];
            });

        if (this.InternalMap) {
            const coords = tt.LngLat.convert(await spawnPoint);
            this.InternalMap.easeTo({ center: coords });
        }

    }
}