import { ApiPromise } from "@polkadot/api";

export function parseErrorName(api: ApiPromise, data: any): string{
    const [dispatchError, dispatchInfo] = data;
    let errorInfo;
    // decode the error
    if (dispatchError.isModule) {
        // for module errors, we have the section indexed, lookup
        // (For specific known errors, we can also do a check against the
        // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
        const decoded = api.registry.findMetaError(dispatchError.asModule);
        errorInfo = `${decoded.section}.${decoded.name}`;
    } else {
        // Other, CannotLookup, BadOrigin, no extra info
        errorInfo = dispatchError.toString();
    }
    return errorInfo;
}