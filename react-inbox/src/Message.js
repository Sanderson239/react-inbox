import React, { Component } from 'react';
import Labels from './Labels';


class Message extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.showCompose) {
      return false;
    }
    if (this.props.starred !== nextProps.starred) {
      return true;
    }
    if (this.props.labels !== nextProps.labels) {
      return true;
    }
    if (this.props.read !== nextProps.read) {
      return true;
    }
    if (this.props.selected !== nextProps.selected) {
      return true;
    }
    if (this.props.read !== nextProps.read) {
      return true;
    }
    if (this.props.labels.toString() !== nextProps.labels.toString()) {
      return true;
    }
    return false;
  }




render() {
  const id = this.props.id;
  const read = this.props.read ? 'read' : 'unread';
  const starred = this.props.starred ? 'fa-star' : 'fa-star-o';
  const selected = this.props.selected ? 'selected' : '';
  const labels = this.props.labels;

    return (
      <div className={`row message ${read} ${selected}`}>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={this.props.selected} onChange={() => this.props.toggleProperty(this.props,'selected')}/>
            </div>
            <div className="col-xs-2">
              <i className={`star fa ${starred}`} onClick={() => this.props.toggleProperty(this.props,'starred', 'PATCH', 'star')}></i>
            </div>
          </div>
        </div>
        <div className="col-xs-11" onClick={() => this.props.readEmail(this.props, true)}>
        {labels.map(label => <Labels label={label} key={label} />)}
          <a href="#">
            {this.props.subject}
          </a>
        </div>
      </div>    );
  }
}

export default Message
