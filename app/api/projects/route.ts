const GITHUB_OWNER = process.env.GITHUB_OWNER ?? "solidsnk86";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubRepo {
	id: number;
	name: string;
	description: string | null;
	created_at: string;
}

const excludedRepos = [
	"doubleCommit.ts",
	"background-remover",
	"curriculumweb",
	"cdn-js",
	"neo-wifi-desktop",
	"python-finales",
	"pruebas-js-camara",
	"PortfolioGrupal",
	"electron",
	"dashboard-369",
	"CvOnline-modelo1",
	"Carniceria-Nievas",
	"double-commit",
	"node-js-class",
	"Electron-ServiciosElectricos",
	"TP-Grupo-GitHub",
	"Tecnicatura_UTN",
];

export async function GET() {
	if (!GITHUB_TOKEN) {
		return Response.json(
			{ message: "Falta configurar GITHUB_TOKEN en el entorno" },
			{ status: 500 }
		);
	}

	const allProjects: GitHubRepo[] = [];
	let page = 1;

	try {
		while (true) {
			const response = await fetch(
				`https://api.github.com/users/${GITHUB_OWNER}/repos?per_page=100&page=${page}`,
				{
					headers: {
						Authorization: `Bearer ${GITHUB_TOKEN}`,
						Accept: "application/vnd.github+json",
					},
				}
			);

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			const pageRepos = (await response.json()) as GitHubRepo[];
			allProjects.push(
				...pageRepos.filter((repo) => !excludedRepos.includes(repo.name))
			);

			const hasNextPage = response.headers.get("link")?.includes('rel="next"');
			if (!hasNextPage) {
				break;
			}

			page += 1;
		}

		allProjects.sort(
			(a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		);

		return Response.json({ allProjects }, { status: 200 });
	} catch (error) {
		const message = error instanceof Error ? error.message : "Error desconocido";
		return Response.json({ message }, { status: 500 });
	}
}
