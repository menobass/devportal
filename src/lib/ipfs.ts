import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { strings } from '@helia/strings'

let helia: any = null
let fs: any = null
let stringHeliaInstance: any = null

export async function getHelia() {
  if (!helia) {
    helia = await createHelia()
    fs = unixfs(helia)
    stringHeliaInstance = strings(helia)
  }
  return { helia, fs, strings: stringHeliaInstance }
}

export async function addFile(file: Uint8Array): Promise<string> {
  const { fs } = await getHelia()
  const cid = await fs.addFile({ content: file })
  return cid.toString()
}

export async function addString(content: string): Promise<string> {
  const { strings } = await getHelia()
  const cid = await strings.add(content)
  return cid.toString()
}

export async function getFile(cid: string): Promise<Uint8Array> {
  const { fs } = await getHelia()
  const chunks: Uint8Array[] = []
  
  for await (const chunk of fs.cat(cid)) {
    chunks.push(chunk)
  }
  
  // Concatenate all chunks
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const result = new Uint8Array(totalLength)
  let offset = 0
  
  for (const chunk of chunks) {
    result.set(chunk, offset)
    offset += chunk.length
  }
  
  return result
}

export async function getString(cid: string): Promise<string> {
  const { strings } = await getHelia()
  return await strings.get(cid)
}