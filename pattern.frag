#version 330 compatibility

uniform float	uS0;
uniform float	uT0;
uniform float	uDs;
uniform float	uDt;
uniform vec3	uSpecularColor;
uniform float	uShininess;
uniform float	uKa, uKd, uKs;
uniform float	uSize;
uniform sampler2D uTexUnit;

in vec2  	vST;		// texture coords
in vec3 vColor;
in vec3	vL;
in vec3 vE;
in vec3 vN;

void
main()
{
	// texture
	vec3 newcolor = texture(uTexUnit, vST).rgb;

	// per fragment lighting code
	vec3 Normal = normalize(vN);
	vec3 Light = normalize(vL);
	vec3 Eye = normalize(vE);

	vec3 ambient = uKa*newcolor;

	float d = max(dot(Normal, Light), 0.);
	vec3 diffuse = uKd*d*newcolor;

	float s = 0.;
	if (dot(Normal, Light) > 0.) {
		vec3 ref = normalize(reflect(-Light, Normal));
		s = pow(max(dot(Eye, ref), 0.), uShininess);
	}

	vec3 specular = uKs*s*uSpecularColor;
	// end of lighting specific code
	

	// set the fragment color (default based on lightning)
	gl_FragColor = vec4(ambient+diffuse+specular, 1.);	
}

