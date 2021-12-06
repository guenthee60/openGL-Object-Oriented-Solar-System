#version 330 compatibility

uniform float   uDs;
uniform float	uDt;
uniform float	uV0;
uniform float	uV1;

out vec2  	vST;		// texture coords
out vec3	vN;
out vec3	vL;
out vec3	vE;
out vec3 vColor;


const vec3 LIGHTPOSITION = vec3(5., 5., 500.);
const float PI = 3.14159265;
const float AMP = 0.2;		// amplitude
const float W = 2.;		// frequency

void
main()
{	
	// textures
	vST = gl_MultiTexCoord0.st;

	// per fragment lighting code 
	vec4 ECposition = gl_ModelViewMatrix*gl_Vertex;
	vN = normalize(gl_NormalMatrix*gl_Normal);
	vL = LIGHTPOSITION - ECposition.xyz;

	vE = vec3(0., 0., 0.) - ECposition.xyz;
	// end of lighting stuff


	gl_Position = gl_ModelViewProjectionMatrix*gl_Vertex;
}
