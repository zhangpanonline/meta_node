import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
    value:number
}

const initialState: CounterState = {
    value: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        inc(state) {
            state.value += 1
        },
        dec(state) {
            state.value -= 1
        },
        amount(state, action: PayloadAction<CounterState['value']>) {
            state.value += action.payload
        }
    }
})

export const { inc, dec, amount } = counterSlice.actions

export default counterSlice.reducer