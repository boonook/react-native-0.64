import React, { PureComponent, Component } from 'react'
import {
    Animated,
    StyleSheet,
    View,
    Easing,
} from 'react-native'

export const LENGTH = 5
export const HEIGHT = 40
let timer;
export default class StepMarqueeView extends React.Component<any,any> {
    static propTypes = {}

    static defaultProps = {
        duration: Number,
        useNativeDriver: Boolean
    }

    animatedValue = new Animated.Value(0)
    animatedValue2 = new Animated.Value(0)

    state = {
        count: 0 - 1,
        count2: this.props.data.length - 1,
    }

    componentWillUnmount() {
        timer && clearInterval(timer)
    }

    componentDidMount () {
        this.animateScroll()
    }

    animateScroll = () => {
        const {
            duration, useNativeDriver,
        } = this.props
        timer = this.setTimeout(() => {
            Animated.timing(this.animatedValue, {
                toValue: this.state.count * HEIGHT,
                // @ts-ignore
                easing: Easing.linear(Easing.bezier(0, 0, 1, 1)),
                duration: duration,
                useNativeDriver,
            }).start(({finished}) => {
                if (finished) {
                    this.animateScroll()
                    if (this.state.count === -this.props.data.length) {
                        this.setState({
                            count: this.props.data.length - 1,
                        })
                    } else {
                        this.setState({
                            count: this.state.count - 1,
                        })
                    }
                }
            })

            Animated.timing(this.animatedValue2, {
                toValue: this.state.count2 * HEIGHT,
                // @ts-ignore
                easing: Easing.linear(Easing.bezier(0, 0, 1, 1)),
                duration: duration,
                useNativeDriver,
            }).start(({finished}) => {
                if (finished) {
                    this.animateScroll()
                    if (this.state.count2 === -this.props.data.length) {
                        this.setState({
                            count2: this.props.data.length - 1,
                        })
                    } else {
                        this.setState({
                            count2: this.state.count2 - 1,
                        })
                    }
                }
            })

        }, 1000)

    }

    clearTimeout () {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
    }

    setTimeout (fn, time = 0) {
        this.clearTimeout()
        timer = setTimeout(fn, time)
    }

    renderList = () => this.props.data.map((item, index) => this.props.renderItem(item, index))

    render () {
        const {
            style, ...props
        } = this.props

        return (
            <View style={[
                styles.container,
                style,
            ]}>
                {
                    (this.state.count !== this.props.data.length - 1) &&
                    <Animated.View
                        style={[
                            {
                                transform: [
                                    {translateY: this.animatedValue},
                                ],
                                width: null
                            }
                        ]}
                    >
                        {this.renderList()}
                    </Animated.View>
                }
                <View style={StyleSheet.absoluteFillObject}>
                    {
                        (this.state.count2 !== this.props.data.length - 1) &&
                        <Animated.View
                            style={[
                                {
                                    transform: [
                                        {translateY: this.animatedValue2},
                                    ],
                                    width: null
                                }]
                            }
                        >
                            {this.renderList()}
                        </Animated.View>
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        height: LENGTH * HEIGHT,
        backgroundColor: 'white',
    },
})
