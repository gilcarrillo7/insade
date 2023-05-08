export interface Posts {
	allWpPost: AllWpPost;
	allWpPage?: any;
}

export interface AllWpPost {
	nodes: NodeWp[];
}
export interface NodeWp {
	modelo_intervencion?: NodeModeloIntervencion;
	equipo_post?: NodeEquipoPost;
	articulo?: NodeArticulo;
	vacantes?: NodeVacante;
	bancoNoticias?: NodeBancoNoticias;
	biblioteca?: NodeBiblioteca;
	sidePreview?: NodeSidePreview;
	alianzareconocimiento?: NodeAlianza;
	resultados?: NodeResultado;
	hidden?: NodeHidden;
	translations?: Translation[];
}

export interface Translation {
	modelo_intervencion?: NodeModeloIntervencion;
	equipo_post?: NodeEquipoPost;
	articulo?: NodeArticulo;
	vacantes?: NodeVacante;
	bancoNoticias?: NodeBancoNoticias;
	sidePreview?: NodeSidePreview;
	biblioteca?: NodeBiblioteca;
	alianzareconocimiento?: NodeAlianza;
	resultados?: NodeResultado;
	hidden?: NodeHidden;
}

export interface NodeHidden {
	slug: string;
	title: string;
	subtitle: string;
	content: string;
	prevlinktext: string;
	prevresume: string;
	prevlinkurl: string;
	prevtitle: string;
	previmage: Image;
	image: Image;
}

export interface NodeAlianza {
	order: number;
	image: Image;
}
export interface NodeResultado {
	maintext: string;
	subtext: string;
	order: number;
}
export interface NodeBiblioteca {
	order: number;
	resume: string;
	link: string;
	linktext: string;
	image: Image;
}

export interface NodeBancoNoticias {
	order: number;
	resume: string;
	url: string;
	title: string;
	linktext: string;
}

export interface NodeSidePreview {
	order: number;
	title: string;
	text: string;
	linktext: string;
	link: string;
	image: Image;
}

export interface NodeModeloIntervencion {
	buttonTitle: string;
	title: string;
	image: Image;
	slug: string;
	resume: string;
	mainImage: Image;
	buttonproductos: string;
	buttoproductosurl: string;
	content1: string;
	contentgreen: string;
	content2: string;
	image1: Image;
	image2: Image;
	order: number;
	productoscontent: string;
	productosimage: Image;
	productostitle: string;
	testimonies: string;
	testomonytitle: string;
}

export interface NodeArticulo {
	content: string;
	linkText: string;
	mainImage: Image;
	resume: string;
	title: string;
	thumb: Image;
	slug: string;
	order: number;
	sig: string;
}
export interface NodeEquipoPost {
	name: string;
	role: string;
	image: Image;
	order: number;
}
export interface NodeVacante {
	content: string;
	order: number;
	title: string;
}
export interface NodeImage {
	image: Image;
}

export interface Image {
	sourceUrl: string;
}
