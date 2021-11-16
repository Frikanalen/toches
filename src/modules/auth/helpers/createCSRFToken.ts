import { randomBytes } from "crypto"
import { promisify } from "util"

const randomBytesAsync = promisify(randomBytes)

export const createCSRFToken = async () => (await randomBytesAsync(64)).toString("hex")
