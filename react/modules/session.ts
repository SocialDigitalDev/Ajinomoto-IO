export function getSession() {
    return window &&
      (window as any).__RENDER_8_SESSION__ &&
      (window as any).__RENDER_8_SESSION__.sessionPromise
      ? ((window as any).__RENDER_8_SESSION__.sessionPromise as Promise<any>)
      : null
  }