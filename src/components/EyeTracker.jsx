import React, { useEffect, useRef } from 'react';

export default function EyeTracker() {
  const leftIrisRef = useRef(null);
  const rightIrisRef = useRef(null);

  useEffect(() => {
    const eyes = [
      { el: leftIrisRef.current, cx: 0, cy: 0, targetX: 0, targetY: 0, curX: 0, curY: 0, easeMul: 0.96 },
      { el: rightIrisRef.current, cx: 0, cy: 0, targetX: 0, targetY: 0, curX: 0, curY: 0, easeMul: 1.04 }
    ];
    const EASE = 0.29;
    const MAX_PX = 3.5;
    const SENS = 1;

    function measure() {
      eyes.forEach((eye) => {
        if (!eye.el) eye.el = eye === eyes[0] ? leftIrisRef.current : rightIrisRef.current;
        if (!eye.el) return;
        const r = eye.el.getBoundingClientRect();
        eye.cx = r.left + r.width / 2;
        eye.cy = r.top + r.height / 2;
      });
    }

    function setTarget(px, py) {
      eyes.forEach((eye) => {
        const dx = px - eye.cx;
        const dy = py - eye.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.0001) {
          eye.targetX = 0;
          eye.targetY = 0;
          return;
        }
        const travel = Math.min(dist * SENS, MAX_PX);
        eye.targetX = (dx / dist) * travel;
        eye.targetY = (dy / dist) * travel;
      });
    }

    function recenter() {
      eyes.forEach((eye) => {
        eye.targetX = 0;
        eye.targetY = 0;
      });
    }

    const onMouseMove = (e) => setTarget(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) setTarget(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('mouseleave', recenter);
    window.addEventListener('blur', recenter);
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('scroll', measure, { passive: true });

    let animId = null;
    function tick() {
      eyes.forEach((eye) => {
        if (!eye.el) return;
        const e = EASE * eye.easeMul;
        eye.curX += (eye.targetX - eye.curX) * e;
        eye.curY += (eye.targetY - eye.curY) * e;
        eye.el.style.transform = `translate3d(${eye.curX.toFixed(2)}px, ${eye.curY.toFixed(2)}px, 0)`;
      });
      animId = requestAnimationFrame(tick);
    }

    measure();
    animId = requestAnimationFrame(tick);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('mouseleave', recenter);
      window.removeEventListener('blur', recenter);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, []);

  return (
    <div className="floating-character">
      <div className="card">
        <div className="stage" id="stage">
          <img className="base" src="/eye-tracker/base.png" alt="" />
          <img
            ref={leftIrisRef}
            className="iris"
            id="li"
            style={{ left: '34.964%', top: '38.209%', width: '5.879%', height: '6.532%' }}
            src="/eye-tracker/left-iris.png"
            alt=""
          />
          <img
            ref={rightIrisRef}
            className="iris"
            id="ri"
            style={{ left: '57.574%', top: '38.621%', width: '5.417%', height: '6.315%' }}
            src="/eye-tracker/right-iris.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
