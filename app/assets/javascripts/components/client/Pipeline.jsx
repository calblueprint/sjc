/**
 * @prop stage - name of the stage for the pipeline
 * @prop active - if pipeline is current stage or not
 */

class Pipeline extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.active ? "pipeline-stage active" : "pipeline-stage";

    return (
      <div className={name}>
        <svg width="149" height="76" viewBox="0 0 149 76">
        <g id="Canvas" transform="translate(-6985 255)">
        <g id="Mask Group" filter="url(#filter0_d)">
        <g id="Union">
        <use xlinkHref="#path0_fill" transform="translate(6989.08 -255)" fill="#9BB989"/>
        </g>
        </g>
        </g>
        <defs>
        <filter id="filter0_d" filterUnits="userSpaceOnUse" x="6985" y="-255" width="149" height="76" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0"/>
        <feOffset dx="0" dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        <path id="path0_fill" fillRule="evenodd" d="M 0 0L 119.891 0L 119.891 0.518997L 140.612 33.8315L 119.891 67.1439L 119.891 67.6629L 0 67.6629L 0.000488281 67.1439L 20.7222 33.8315L 0.000488281 0.518997L 0 0Z"/>
        </defs>
        <text x="77px" y="40px" fill="white" textAnchor="middle">{this.props.stage}</text>
        </svg>
      </div>


    )
  }
}
