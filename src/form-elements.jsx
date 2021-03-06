import React from 'react';
import HeaderBar from './header-bar';
import Select from 'react-select';
import { sortable } from 'react-anything-sortable';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import ReactDatePicker from 'react-datepicker';
import StarRating from './star-rating';
import myxss from './filter-xss';
import moment from 'moment';
import cx from 'classnames';
import SignaturePad from 'react-signature-pad';
import md5 from 'md5';
import ElementActions from './actions/ElementActions';
import uuid from 'uuid/v4';

class RfbItem extends React.Component {
  _onDestroy(item) {
    ElementActions.deleteElement(item);
  }

  render() {
    const {
      data = {},
      children = '',
      className = '',
      mutable = true,
      editModeOn = () => null,
      onClone = () => null,
      ...props
    } = this.props;

    const invalidClases = ['', 'true', 'false', 'undefined'];
    const classes = className.split(' ').map(x => x.trim()).filter(x => !invalidClases.includes(x));
    data.pageBreakBefore && classes.push('alwaysbreak');
    classes.push('rfb-item');

    return (
      <div {...props} className={classes.join(' ')}>
        {!mutable &&
        <div>
          {data.pageBreakBefore && <div className="preview-page-break">Page Break</div>}
          <HeaderBar editModeOn={editModeOn} data={data} onDestroy={this._onDestroy} onClone={onClone} static={data.static} required={data.required} />
        </div>
        }
        {children}
      </div>
    );
  }
}

class RfbLabel extends React.Component {
  render() {
    const required = this.props.required === true && !this.props.read_only;

    return (
      <label className="form-label">
        <span dangerouslySetInnerHTML={{ __html: myxss.process(this.props.label) }} />
        {required && <span className="label-required label label-danger">Required</span>}
      </label>
    );
  }
}

@sortable
class Header extends React.Component {
  render() {
    const classNames = cx('static', { bold: this.props.data.bold, italic: this.props.data.italic });

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <h3 className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </RfbItem>
    );
  }
}

@sortable
class Paragraph extends React.Component {
  render() {
    const classNames = cx('static', { bold: this.props.data.bold, italic: this.props.data.italic });

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <p className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </RfbItem>
    );
  }
}

@sortable
class Label extends React.Component {
  render() {
    const classNames = cx('static', { bold: this.props.data.bold, italic: this.props.data.italic });

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <label className={classNames} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
      </RfbItem>
    );
  }
}

@sortable
class LineBreak extends React.Component {
  render() {
    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <hr />
      </RfbItem>
    );
  }
}

@sortable
class TextInput extends React.Component {
  render() {
    let props = {};
    props.type = 'text';
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />
          <input {...props} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class NumberInput extends React.Component {
  render() {
    let props = {};
    props.type = 'number';
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />
          <input {...props} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class TextArea extends React.Component {
  render() {
    let props = {};
    props.className = 'form-control';
    props.name = this.props.data.field_name;

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />
          <textarea {...props} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    var value, internalValue;

    if (this.props.data.defaultToday && (this.props.defaultValue === '' || this.props.defaultValue === undefined)) {
      value = moment().format('MM/DD/YYYY');
      internalValue = moment();
    } else {
      value = this.props.defaultValue;

      if (this.props.defaultValue !== '' && this.props.defaultValue !== undefined) {
        internalValue = moment(value, 'MM/DD/YYYY');
      }
    }

    return {
      value: value,
      internalValue: internalValue,
      placeholder: 'mm/dd/yyyy',
      defaultToday: this.props.data.defaultToday,
    };
  }

  handleChange = (dt) => {
    if (dt && dt.target) {
      var placeholder = (dt && dt.target && dt.target.value === '') ? 'mm/dd/yyyy' : '';
      var formattedDate = (dt.target.value) ? moment(dt.target.value).format('YYYY-MM-DD') : '';

      this.setState({
        value: formattedDate,
        internalValue: formattedDate,
        placeholder: placeholder,
      });

    } else {
      this.setState({
        value: (dt) ? dt.format('MM/DD/YYYY') : '',
        internalValue: dt,
        placeholder: placeholder,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.data.defaultToday && !this.state.defaultToday) {
      this.state.value = moment().format('MM/DD/YYYY');
      this.state.internalValue = moment(this.state.value);
    } else if (!this.props.data.defaultToday && this.state.defaultToday) {
      this.state.value = '';
      this.state.internalValue = undefined;
    }

    this.state.defaultToday = this.props.data.defaultToday;
  }

  render() {
    let props = {};
    props.type = 'date';
    props.className = 'form-control';
    props.disabled = this.props.read_only;
    props.name = this.props.data.field_name;

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />
          <div>
            {this.props.read_only || this.props.data.readOnly ? (
              <input
                readOnly
                type="text"
                name={props.name}
                ref={props.ref}
                placeholder='mm/dd/yyyy'
                value={this.state.value}
                className="form-control" />
            ) : (
              <ReactDatePicker
                name={props.name}
                ref={props.ref}
                disabled={props.disabled}
                onChange={this.handleChange}
                selected={this.state.internalValue}
                todayButton={'Today'}
                className="form-control"
                isClearable={true}
                dateFormat="MM/DD/YYYY"
                placeholderText='mm/dd/yyyy' />
            )}
          </div>
        </div>
      </RfbItem>
    );
  }
}

class DrawSignature extends React.Component {
  componentDidMount() {
    const $clear = $(this.canvasRef.refs.cv.parentElement.nextElementSibling.childNodes[0]);
    $clear && $clear.on('click', this._clearDataUrl);
    $clear.attr('type', 'button');

    window.addEventListener('resize', this._drawToCanvas);
    this._drawToCanvas();
  }

  componentWillUnmount() {
    const $clear = $(this.canvasRef.refs.cv.parentElement.nextElementSibling.childNodes[0]);
    $clear && $clear.on('click', this._clearDataUrl);
    window.removeEventListener('resize', this._drawToCanvas);
  }

  _drawToCanvas = () => {
    if (this.props.value !== undefined && this.props.value.length > 0) {
      this.canvasRef.fromDataURL('data:image/' + this.props.value);
    }
  };

  _clearDataUrl = (e) => {
    this.props.onChange({ value: '' });
  };

  _setDataUrl = () => {
    if (this.canvasRef.isEmpty()) {
      this.props.onChange({ value: '' });
    } else {
      const value = this.canvasRef.toDataURL().replace('data:image/', '');
      this.props.onChange({ value });
    }
  };

  render() {
    const props = {};
    props.clearButton = true;
    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
    }

    return <SignaturePad {...props} ref={(ref) => this.canvasRef = ref} onEnd={this._setDataUrl} />;
  }
}

class TypeSignature extends React.Component {
  componentDidMount() {
    this.canvasCtx = this.canvasRef.getContext('2d');
    this.canvasCtx.font = 'normal 1.875em/50px "Journal",\'Comic Sans MS\',Georgia,Times,serif';
    this.canvasCtx.fillText(this.props.inputText || '', 10, 50);
  }

  onChange = (e) => {
    const inputText = e.target.value || '';
    const { width, height } = this.canvasRef;
    this.canvasCtx.clearRect(0, 0, width, height);
    this.canvasCtx.fillText(inputText, 10, 50);
    const value = inputText ? this.canvasRef.toDataURL().replace('data:image/', '') : '';

    this.props.onChange({ inputText, value });
  };

  render() {
    return (
      <div className='form-group'>
        <label>Type your name</label>
        <input type='text' className='form-control' onChange={this.onChange} value={this.props.inputText} />

        <div className='type-signature-body'>
          <canvas ref={(ref) => this.canvasRef = ref} width="530" height="100" />
        </div>
      </div>
    );
  }
}

class SignatureCert extends React.Component {
  constructor(props) {
    super(props);

    this.state = { certModalOpened: false };
  }

  openCert = () => {
    this.setState({ certModalOpened: true });
  };

  closeCert = () => {
    this.setState({ certModalOpened: false });
  };

  render() {
    const { signer_name, signer_email, signed_at, signer_ip, value, reference } = this.props;
    const signedAt = moment(signed_at).format('LLL');
    const signerIp = signer_ip.split('.').splice(3, 1, '***').join('.');
    const sourceDataURL = `data:image/${value}`;
    const fingerprint = md5(value);

    return (
      <div>
        <i>
          e-signed by {signer_name} on {signedAt} from IP {signerIp}
          - <a onClick={this.openCert}>Certificate</a>
        </i>

        {this.state.certModalOpened && <div role="dialog">
          <div className="fade modal-backdrop in" />
          <div role="dialog" tabIndex="-1" className="fade invite-people-modal in modal edit-modal">
            <div className="modal-dialog">
              <div className="modal-content" role="document">
                <div className="modal-header">
                  <h4 className="modal-title pull-left">Signature Certificate</h4>
                  <a role="link" onClick={this.closeCert}><i className="pull-right fa fa-times dismiss-edit" /></a>
                </div>
                <div className="modal-body edit-form">
                  <div>
                    <div><b>{signer_name}</b></div>
                    <div>IP: {signer_ip}</div>
                    <div>Email: {signer_email} <span className="label label-primary" style={{ lineHeight: '21px' }}>Verified</span></div>
                    <div>Captured: {signedAt}</div>
                    <div>Reference: {reference}</div>
                    <br />
                  </div>
                  <img src={sourceDataURL} className="responsive-signature" />
                  Fingerprint Checksum: {fingerprint}
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

@sortable
class Signature extends React.Component {
  constructor(props) {
    super(props);

    const initalState = {
      value: '',
      inputText: '',
      inputType: 'draw',
      reference: '',
      signature: '',
      signer_ip: '',
      signed_at: '',
      signer_name: '',
      signer_email: '',
    };

    if (this.props.defaultValue) {
      try {
        this.state = JSON.parse(this.props.defaultValue);
      } catch (e) {
        // Backward compatible for already available Singature version
        if (typeof this.props.defaultValue === 'string' && this.props.defaultValue.indexOf(';base64,') > -1) {
          initalState.value = this.props.defaultValue;
        }
        this.state = initalState;
      }
    } else {
      this.state = initalState;
    }

    this.originalValue = { draw: '', type: '' };
    this.originalValue[this.state.inputType] = this.state.value;
  }

  onChange = (state) => {
    this.setState(state);
  };

  onToggleInputType = (e) => {
    this.originalValue[this.state.inputType] = this.state.value;
    const inputType = e.target.value;
    const value = this.originalValue[inputType];

    this.onChange({ inputType, value });
  };

  render() {
    const props = {
      onChange: this.onChange,
      value: this.state.value,
      inputText: this.state.inputText,
    };

    const input_type_props = {
      type: 'radio',
      onChange: this.onToggleInputType,
      name: 'input_type_' + this.props.data.field_name,
    };

    const hidden_props = {
      type: 'hidden',
      name: this.props.data.field_name,
      value: JSON.stringify({
        value: this.state.value || '',
        inputText: this.state.inputText,
        inputType: this.state.inputType,
      }),
    };

    const certificate_props = {
      value: this.state.value,
      reference: this.state.reference,
      signature: this.state.signature,
      signer_ip: this.state.signer_ip,
      signed_at: this.state.signed_at,
      signer_name: this.state.signer_name,
      signer_email: this.state.signer_email,
    };

    let sourceDataURL = false;
    if (this.props.read_only === true && this.state.value && this.state.value.length > 0) {
      sourceDataURL = `data:image/${this.state.value}`;
    }

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />

          {!this.props.read_only &&
          <div>
            <div className="bs-callout bs-callout-warning">
              <p>I agree that the signature and initials will be the electronic representation of my signature and initial for all purposes when I (or my agent) use them on documents, including legally binding contracts - just the same as pen-and-paper signing or initial.</p>
            </div>

            <div className='form-group'>
              <label className='radio-label option-inline'>
                <input value='draw' defaultChecked={this.state.inputType !== 'type'} {...input_type_props} /> Draw
              </label>
              <label className='radio-label option-inline'>
                <input value='type' defaultChecked={this.state.inputType === 'type'} {...input_type_props} /> Type
              </label>
            </div>

            {this.state.inputType === 'type' ? <TypeSignature {...props} /> : <DrawSignature {...props} />}
            <input {...hidden_props} />
          </div>
          }

          {this.props.read_only && sourceDataURL && <div>
            <img src={sourceDataURL} className="responsive-signature" />
            {this.state.signature && <SignatureCert {...certificate_props} />}
          </div>}

          {this.props.read_only && !sourceDataURL && <div className="no-signature">No Signature</div>}
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    let value = [];
    try {
      value = JSON.parse(this.props.defaultValue) || [];
    } catch (e) {
      // Do nothing
    }

    this.state = { value };
  }

  handleChange = (e) => {
    this.setState({ value: e });
  };

  render() {
    let hidden_props = {};
    hidden_props.type = 'hidden';
    hidden_props.name = this.props.data.field_name;

    if (this.props.data.isMulti) {
      hidden_props.value = this.state.value.length ? JSON.stringify(this.state.value) : '';
    } else {
      hidden_props.value = Object.keys(this.state.value).length ? JSON.stringify(this.state.value) : '';
    }

    const options = this.props.data.options.map(({ value, text }) => ({ value, label: text }));

    if (options.length < 1 || (!this.props.data.isMulti && options[0].value !== '')) {
      options.unshift({ value: '', label: '' });
    }

    let props = {};
    props.isSearchable = true;
    props.isMulti = this.props.data.isMulti;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;
    props.options = options;
    props.isDisabled = this.props.read_only;

    if (!this.props.mutable) {
      props.value = options[this.props.data.isMulti ? 0 : 1];
    } // to show a sample of what tags looks like

    if (this.props.mutable) {
      props.value = this.state.value;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />
          <Select {...props} />
          {this.props.mutable && !this.props.read_only && (<input {...hidden_props} />)}
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Checkboxes extends React.Component {
  render() {
    let self = this;
    const classNames = cx('checkbox-label', { 'option-inline': this.props.data.inline });

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />
          {this.props.data.options.map(function(option) {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = 'option_' + option.key;

            props.type = 'checkbox';
            props.value = option.value;
            props.disabled = self.props.read_only;
            if (self.props.mutable) {
              props.defaultChecked = self.props.defaultValue.indexOf(option.value) > -1 ? true : false;
              props.ref = 'child_ref_' + option.key;
            }
            return (
              <label className={classNames} key={this_key}>
                <input {...props} /> {option.text}
              </label>
            );
          })}
        </div>
      </RfbItem>
    );
  }
}

@sortable
class RadioButtons extends React.Component {
  render() {
    let self = this;
    const classNames = cx('radio-label', { 'option-inline': this.props.data.inline });

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />
          {this.props.data.options.map(function(option) {
            let this_key = 'preview_' + option.key;
            let props = {};
            props.name = self.props.data.field_name;

            props.type = 'radio';
            props.value = option.value;
            props.disabled = self.props.read_only;
            if (self.props.mutable) {
              props.defaultChecked = (self.props.defaultValue !== undefined && self.props.defaultValue.indexOf(option.value) > -1) ? true : false;
              props.ref = 'child_ref_' + option.key;
            }
            return (
              <label className={classNames} key={this_key}>
                <input {...props} /> {option.text}
              </label>
            );
          })}
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Image extends React.Component {
  render() {
    const style = { ...this.props.style };

    if (this.props.data.center) {
      style.textAlign = 'center';
    }

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        {this.props.data.src ?
          <img src={this.props.data.src} width={this.props.data.width} height={this.props.data.height} style={{ maxWidth: '100%' }} /> :
          <div className="no-image">No Image</div>
        }
      </RfbItem>
    );
  }
}

@sortable
class Annotation extends React.Component {
  colors = {
    '0': '#0000FF',
    '1': '#FF0000',
    '2': '#008000',
    '3': '#800080',
    '4': '#F8D500',
    '5': '#000000',
  };

  centerAlign = {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    margin: 'auto',
  };

  leftAlign = {
    position: 'static',
    margin: 'auto',
  };

  constructor(props) {
    super(props);

    this.state = { value: this.props.defaultValue || this.props.data.src || '' };
  }

  onChangePenColor = (e) => {
    this.canvasRef.penColor = this.colors[e.target.value];
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.mutable) {
      this.setState({ value: nextProps.data.src || '' }, this._drawToCanvas);
    }
  }

  componentDidMount() {
    if (!this.props.read_only) {
      const $clear = $(this.canvasRef.refs.cv.parentElement.nextElementSibling.childNodes[0]);
      $clear && $clear.on('click', this._clearDataUrl);
      $clear.attr('type', 'button');

      window.addEventListener('resize', this._drawToCanvas);
      this._drawToCanvas();
    }
  }

  componentWillUnmount() {
    if (!this.props.read_only) {
      const $clear = $(this.canvasRef.refs.cv.parentElement.nextElementSibling.childNodes[0]);
      $clear && $clear.off('click', this._clearDataUrl);
      window.removeEventListener('resize', this._drawToCanvas);
    }
  }

  _getImageDimenssions = (maxWidth, callback) => {
    const divId = `hiddenImage_${uuid()}`;
    const html = `
    <div id='${divId}' className="responsive-signature" style="width: 100%;">
      <img
        style="max-width: ${maxWidth}px;"
        width="${this.props.data.width || ''}"
        height="${this.props.data.height || ''}"
        src="data:image/${this.state.value}" />
      <br />
    </div>`;

    $('body').append(html);
    const $div = $(`#${divId}`);
    const $img = $div.find('img');

    $img.one('load', () => {
      callback($img[0].clientWidth, $img[0].clientHeight);
      $div.remove();
    });
  };

  _drawToCanvas = () => {
    const self = this;
    const $canvas = $(this.canvasRef.refs.cv);
    const $body = $(this.canvasRef.refs.cv.parentElement);

    if (this.state.value && this.state.value.length > 0) {
      this._getImageDimenssions($body.width(), (width, height) => {
        $body.height(height);
        $canvas.width(width);
        $canvas.height(height);
        $canvas.css(self.props.data.center ? self.centerAlign : self.leftAlign);

        self.canvasRef._resizeCanvas();
        self.canvasRef.fromDataURL('data:image/' + self.state.value);
      });
    } else {
      const { height } = this.props.data;

      $body.height(height || 200);
      $canvas.width($body.width());
      $canvas.height(height || 200);
      $canvas.css(this.props.data.center ? this.centerAlign : this.leftAlign);

      this.canvasRef._resizeCanvas();
    }
  };

  _clearDataUrl = (e) => {
    this.setState({ value: this.props.data.src || '' }, this._drawToCanvas);
  };

  _setDataUrl = () => {
    const value = this.canvasRef.toDataURL().replace('data:image/', '');
    this.setState({ value });
  };

  render() {
    const props = {
      clearButton: true,
      penColor: this.colors[0],
    };

    const pen_color_props = {
      type: 'radio',
      onChange: this.onChangePenColor,
      name: 'pen_color_' + this.props.data.field_name,
    };

    const hidden_props = {
      type: 'hidden',
      value: this.state.value || '',
      name: this.props.data.field_name,
    };

    let sourceDataURL = false;
    if (this.props.read_only === true && this.state.value && this.state.value.length > '0') {
      sourceDataURL = `data:image/${this.state.value}`;
    }

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />

          {!this.props.read_only &&
          <div>
            <div className='form-group'>
              <label className='radio-label option-inline' style={{ color: this.colors[0] }}>
                <input value='0' defaultChecked {...pen_color_props} /> Blue
              </label>
              <label className='radio-label option-inline' style={{ color: this.colors[1] }}>
                <input value='1' {...pen_color_props} /> Red
              </label>
              <label className='radio-label option-inline' style={{ color: this.colors[2] }}>
                <input value='2' {...pen_color_props} /> Green
              </label>
              <label className='radio-label option-inline' style={{ color: this.colors[3] }}>
                <input value='3' {...pen_color_props} /> Purple
              </label>
              <label className='radio-label option-inline' style={{ color: this.colors[4] }}>
                <input value='4' {...pen_color_props} /> Yellow
              </label>
              <label className='radio-label option-inline' style={{ color: this.colors[5] }}>
                <input value='5' {...pen_color_props} /> Black
              </label>
            </div>

            <SignaturePad {...props} ref={(ref) => this.canvasRef = ref} onEnd={this._setDataUrl} />
            <input {...hidden_props} />
          </div>
          }

          {this.props.read_only && sourceDataURL && <div>
            <img src={sourceDataURL} className="responsive-signature" />
          </div>}

          {this.props.read_only && !sourceDataURL && <div className="no-signature">No Image</div>}
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Rating extends React.Component {
  render() {
    let props = {};
    props.name = this.props.data.field_name;
    props.ratingAmount = 5;

    if (this.props.mutable) {
      props.rating = (this.props.defaultValue !== undefined && this.props.defaultValue.length) ? parseFloat(this.props.defaultValue, 10) : 0;
      props.editing = true;
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />
          <StarRating {...props} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class HyperLink extends React.Component {
  render() {
    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <a target="_blank" href={this.props.data.href} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Download extends React.Component {
  render() {
    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <a href={this.props.download_path + '?id=' + this.props.data.file_path} dangerouslySetInnerHTML={{ __html: myxss.process(this.props.data.content) }} />
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Camera extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: props.defaultValue ? `data:image/${props.defaultValue}` : '' };
  }

  displayImage = (e) => {
    var self = this;
    var target = e.target;
    var file, reader;

    if (target.files && target.files.length) {
      file = target.files[0];
      reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = function() {
        self.setState({
          value: reader.result.replace('data:image/', ''),
        });
      };
    }
  };

  clearImage = () => {
    this.setState({
      value: '',
    });
  };

  openInNewWindow = () => {
    const win = window.open('about:blank');
    const img = `<img src='data:image/${this.state.value}' />`;
    setTimeout(() => win.document.write(img), 100);
  };

  render() {
    let hidden_props = {};
    hidden_props.type = 'hidden';
    hidden_props.value = this.state.value || '';
    hidden_props.name = this.props.data.field_name;

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />
          <div className="image-upload-container">
            {!this.props.read_only && !this.state.value &&
            <div>
              <input type="file" accept="image/*" capture="camera" className="image-upload" onChange={this.displayImage} />
              <div className="image-upload-control">
                <div className="btn btn-default btn-school"><i className="fa fa-camera" /> Upload Photo</div>
                <p>Select an image from your computer or device.</p>
              </div>
            </div>
            }

            {this.props.read_only && !this.state.value &&
            <div className="no-image">No Image</div>
            }

            {this.state.value &&
            <div>
              <img src={`data:image/${this.state.value}`} height="100" className="image-upload-preview" onClick={this.openInNewWindow} /><br />
              {!this.props.read_only &&
              <div className="btn btn-school btn-image-clear" onClick={this.clearImage}>
                <i className="fa fa-times" /> Clear Photo
              </div>
              }
            </div>
            }

            {this.props.mutable && !this.props.read_only && (<input {...hidden_props} />)}
          </div>
        </div>
      </RfbItem>
    );
  }
}

@sortable
class Range extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: this.getDefaultValue(props) };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: this.getDefaultValue(nextProps) });
  }

  getDefaultValue({ defaultValue, data }) {
    return parseInt(defaultValue !== undefined ? defaultValue : data.defaultValue, 10);
  }

  onChangeValue = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    let hidden_props = {};
    hidden_props.type = 'hidden';
    hidden_props.value = this.state.value || '';
    hidden_props.name = this.props.data.field_name;

    let props = {};
    props.type = 'range';
    props.name = this.props.data.field_name;
    props.list = 'tickmarks_' + this.props.data.field_name;
    props.min = this.props.data.min_value;
    props.max = this.props.data.max_value;
    props.step = this.props.data.step;
    props.value = this.state.value;

    if (this.props.mutable) {
      props.ref = 'child_ref_' + this.props.data.field_name;
    }

    if (this.props.read_only) {
      props.disabled = 'disabled';
    }

    let datalist = [];
    for (var i = parseInt(this.props.data.min_value, 10); i <= parseInt(this.props.data.max_value, 10); i += parseInt(this.props.data.step, 10)) {
      datalist.push(i);
    }

    let oneBig = 100 / (datalist.length - 1);

    let _datalist = datalist.map((d, idx) => {
      return <option key={props.list + '_' + idx}>{d}</option>;
    });

    let visible_marks = datalist.map((d, idx) => {
      let option_props = {};
      let w = oneBig;
      if (idx === 0 || idx === datalist.length - 1)
        w = oneBig / 2;
      option_props.key = props.list + '_label_' + idx;
      option_props.style = { width: w + '%' };
      if (idx === datalist.length - 1)
        option_props.style = { width: w + '%', textAlign: 'right' };
      return <label {...option_props}>{d}</label>;
    });

    return (
      <RfbItem
        data={this.props.data}
        style={this.props.style}
        mutable={this.props.mutable}
        className={this.props.className}
        editModeOn={this.props.editModeOn}
        onMouseDown={this.props.onMouseDown}
        onTouchStart={this.props.onTouchStart}
        onClone={this.props.onClone}
      >
        <div className="form-group">
          <RfbLabel
            label={this.props.data.label}
            required={this.props.data.required}
            read_only={this.props.read_only} />
          <div className="range">
            <div className="clearfix">
              <span className="pull-left">{this.props.data.min_label}</span>
              <span className="pull-right">{this.props.data.max_label}</span>
            </div>
            <ReactBootstrapSlider
              name={props.name}
              value={props.value}
              change={this.onChangeValue}
              step={this.props.data.step}
              max={this.props.data.max_value}
              min={this.props.data.min_value}
              disabled={props.disabled} />
          </div>
          <div className="visible_marks">
            {visible_marks}
          </div>
          <datalist id={props.list}>
            {_datalist}
          </datalist>
          {this.props.mutable && !this.props.read_only && (<input {...hidden_props} />)}
        </div>
      </RfbItem>
    );
  }
}

export {
  Header,
  Paragraph,
  Label,
  LineBreak,
  TextInput,
  NumberInput,
  TextArea,
  Signature,
  Checkboxes,
  DatePicker,
  RadioButtons,
  Annotation,
  Image,
  Rating,
  Dropdown,
  HyperLink,
  Download,
  Camera,
  Range,
};
