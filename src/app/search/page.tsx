"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import queryDb, { QueryOut } from "./query";

export default function Search() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [query, setQuery] = useState(searchParams.get("query") ?? "skibidi toilet");

    const [sites, setSites] = useState<QueryOut[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            setSites(await queryDb(query, 50, 0));
            setLoaded(true);
        })();
    }, [searchParams]);

    return (
        <main>
            <div className="p-8 backdrop-blur-lg bg-gray-900/20 border-b-[1px] border-b-gray-800 sticky top-0">
                <form
                    className="py-2 px-4 rounded-full bg-white flex w-fit text-black"
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.push("/search?query=" + query);
                        router.refresh();
                    }}
                >
                    <input
                        className="p-1.5 bg-none focus:outline-none w-[35dvw] max-w-xl"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit">
                        <CiSearch className="inline size-6" />
                    </button>
                </form>
            </div>
            <div className="flex flex-col gap-4 p-8">
                {sites.map((x, i) => (
                    <div key={i} className="max-w-3xl w-full">
                        <a className="break-words" href={x.url}>
                            {x.url}
                        </a>
                    </div>
                ))}
                {!loaded ? (
                    <p>loading</p>
                ) : sites.length == 0 ? (
                    <p>No results matched your search query</p>
                ) : null}
            </div>
        </main>
    );
}
