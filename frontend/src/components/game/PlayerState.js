import {useState} from "react"

/**
 * @typedef {Object} PlayerState
 * @property {boolean} inLobby
 * @property {function} setInLobby
 * @property {boolean} isReady
 * @property {function} setIsReady
 */

/**
 * @returns {PlayerState}
 */

const usePlayerState = () => {
    const [inLobby, setInLobby] = useState(true);
    const [isReady, setIsReady] = useState(false)

    return {
        inLobby: inLobby,
        setInLobby: setInLobby,
        isReady: isReady,
        setIsReady: setIsReady
    }

}

export default usePlayerState;