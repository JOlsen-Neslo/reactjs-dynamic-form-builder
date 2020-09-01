/**
 * @module Page Component
 * @description
 * Intended to be a wrapper for any page in the admin dashboard. Will render
 *  the admin header, and format a container in which page content can be placed.
 */
import React, {
    Component,
    createRef
} from 'react';
import {
    arrayOf,
    func,
    node,
    oneOfType,
    string
} from 'prop-types';

import { noOp } from '../../../tools/helpers';

import './page.scss';

class Page extends Component {
    constructor(props) {
        super(props);
        this.pageRef = createRef();
    }
    
    componentDidUpdate() {
        this.props.onNearPageBottom(this.isNearPageBottom(this.pageRef.current));
    }
    
    /// Detect when the page is scrolled to the bottom
    // TODO: use a threshold so that you don't have to scroll to the very end
    isNearPageBottom(el) {
        return (el.scrollHeight - el.scrollTop) === (el.clientHeight);
    }
    
    handleScroll = (e) => {
        this.props.onNearPageBottom(this.isNearPageBottom(e.target));
    }
    
    render() {
        const { title, action, children } = this.props;
        
        return (
            <section className='page' onScroll={ this.handleScroll } ref={ this.pageRef }>
                <div className='page__content'>
                    <div className='page__content-wrapper'>
                        <div className='page__title-wrapper'>
                            <h1 className='page__title'>{ title }</h1>
                            <div className='page__action'>{ action }</div>
                        </div>
                        { children }
                    </div>
                </div>
            </section>
        );
    };
}

Page.defaultProps = {
    onNearPageBottom: noOp,
};

Page.propTypes = {
    title: string.isRequired,
    children: oneOfType([arrayOf(node), node]),
    onNearPageBottom: func,
    action: node,
};

export default Page;
