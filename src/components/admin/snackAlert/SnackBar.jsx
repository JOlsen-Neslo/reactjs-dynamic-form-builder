/**
 * @module SnackBar Component
 * @description
 * Maintains a stack of provided `notices`. When new notices arrive, they are set to automatically
 *  remove after `NOTICE_REMOVAL_TIMEOUT`. If any notices are removed from the props, then SnackBar
 *  will trigger an exit animation, and subsequently remove from state completely.
 */
import React, { Component } from 'react';

import { isUndefined } from '../../../tools/helpers';

import SnackAlert from './SnackAlert';

import './snackBar.scss';

const NOTICE_REMOVAL_TIMEOUT = 5000;

class SnackBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notices: props.notices || [],
    };

    // keep track of all the timeouts we add, so we can clean up later
    this.timeouts = [];
  }

  componentDidUpdate() {
    this.addNewNotices();
    this.removeStaleNotices();
  }

  doesNoticeExistInProps(noticeId) {
    return !isUndefined(this.props.notices.find(({ id }) => id === noticeId));
  }

  doesNoticeExistInState(noticeId) {
    return !isUndefined(this.state.notices.find(({ id }) => id === noticeId));
  }

  /**
     * Loop through all prop notices. If any are found that are not in state, add to state
     *  and set a timeout to automatically remove the notice.
     */
  addNewNotices() {
    this.props.notices.map((notice) => {
      if (!this.doesNoticeExistInState(notice.id)) {
        this.setState(({ notices }) => ({
          notices: [...notices, notice],
        }), () => {
          const newTimeout = setTimeout(() => this.closeNotice(notice.id), NOTICE_REMOVAL_TIMEOUT);
          return this.timeouts.push(newTimeout);
        });
      }
      return null;
    });
  }

  /**
     * Loop through notices in state. If any are found that are not present in props,
     *  it means we need to remove it from state.
     */
  removeStaleNotices() {
    this.state.notices.map((notice) => {
      if (!this.doesNoticeExistInProps(notice.id)) {
        this.setState(({ notices }) => ({
          notices: notices.filter((_notice) => _notice.id !== notice.id),
        }));
      }
      return null;
    });
  }

  /**
     * Adds a `closing` attribute onto the notice, which triggers the exit animation.
     * After a time period, remove the notice from state completely.
     */
  closeNotice(noticeId) {
    this.setState(({ notices }) => ({
      notices: notices.map((notice) => {
        if (notice.id !== noticeId) {
          return notice;
        }

        return {
          ...notice,
          closing: true,
        };
      }),
    }));

    // 500ms is a safe waiting time before removal, as the exit animation lasts 200ms.
    const newTimeout = setTimeout(() => this.props.onCloseNotice(noticeId), 500);
    this.timeouts.push(newTimeout);
  }

  componentWillUnmount() {
    // clear all timeouts
    this.timeouts.map((timeout) => clearTimeout(timeout));
  }

  /** Render notices from state. */
  renderNotices() {
    const { notices } = this.state;

    return notices.map((notice) => (
      <SnackAlert
        key={notice.id}
        status={notice.alertType}
        title={notice.title}
        onClose={() => this.closeNotice(notice.id)}
        closing={notice.closing}
      />
    ));
  }

  render() {
    return (
      <aside className="snack-bar">
        { this.renderNotices() }
      </aside>
    );
  }
}

export default SnackBar;
