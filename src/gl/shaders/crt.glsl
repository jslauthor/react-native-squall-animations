precision highp float;
varying vec2 uv;

// input from gl-react
uniform sampler2D source;
uniform float time;
uniform vec2 resolution;

void main()
{
	// distance from center of image, used to adjust blur
	vec2 uv = gl_FragCoord.xy / resolution.xy;
	float d = length(uv - vec2(0.5,0.5));

	// blur amount
	float blur = 0.0;
	blur = (1.0 + sin(time*6.0)) * 0.5;
	blur *= 1.0 + sin(time*16.0) * 0.5;
	blur = pow(blur, 3.0);
	blur *= 0.05;
	// reduce blur towards center
	blur *= d;

	// final color
  vec3 col;
  col.r = texture2D( source, vec2(uv.x+blur,uv.y) ).r;
  col.g = texture2D( source, uv ).g;
  col.b = texture2D( source, vec2(uv.x-blur,uv.y) ).b;

	// scanline
	float scanline = sin(uv.y*800.0)*0.04;
	col -= scanline;

	// vignette
	col *= 1.0 - d * 0.5;
  gl_FragColor = vec4(col, 1.0);
}
