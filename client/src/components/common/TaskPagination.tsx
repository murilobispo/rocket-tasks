import { cn } from '@/lib/utils'

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'

import type { PaginationMeta } from '@/types/paginated'

type PageItem = number | 'ellipsis'

interface Props {
	meta: PaginationMeta | undefined
	page: number
	onPageChange: (page: number) => void
	isFetching?: boolean
}

const MAX_LINKS_BEFORE_WINDOWING = 6

function buildPages(page: number, totalPages: number): PageItem[] {
	if (totalPages <= MAX_LINKS_BEFORE_WINDOWING) {
		return Array.from({ length: totalPages }, (_, index) => index + 1)
	}

	const candidates = [...new Set([1, page - 1, page, page + 1, totalPages])]
		.filter((candidate) => candidate >= 1 && candidate <= totalPages)
		.sort((a, b) => a - b)

	const items: PageItem[] = []
	let previous: number | undefined

	for (const current of candidates) {
		if (previous !== undefined && current - previous > 1) {
			items.push('ellipsis')
		}
		items.push(current)
		previous = current
	}

	return items
}

export function TaskPagination({ meta, page, onPageChange, isFetching = false }: Props) {
	if (!meta || meta.totalPages <= 1) {
		return null
	}

	const { totalPages } = meta
	const isFirstPage = page <= 1
	const isLastPage = page >= totalPages

	const goTo = (nextPage: number) => {
		if (nextPage < 1 || nextPage > totalPages || nextPage === page) return
		onPageChange(nextPage)
	}

	return (
		<div className='flex items-center justify-center pt-4' aria-busy={isFetching}>
			<Pagination>
				<PaginationContent className='flex-wrap justify-center'>
					<PaginationItem>
						<PaginationPrevious
							aria-disabled={isFirstPage || undefined}
							className={cn(isFirstPage && 'pointer-events-none opacity-50')}
							onClick={() => goTo(page - 1)}
						/>
					</PaginationItem>

					{buildPages(page, totalPages).map((item, index) =>
						typeof item === 'number' ? (
							<PaginationItem key={item}>
								<PaginationLink
									isActive={item === page}
									aria-label={`Page ${item}`}
									onClick={() => goTo(item)}
								>
									{item}
								</PaginationLink>
							</PaginationItem>
						) : (
							<PaginationItem key={`${item}-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						)
					)}

					<PaginationItem>
						<PaginationNext
							aria-disabled={isLastPage || undefined}
							className={cn(isLastPage && 'pointer-events-none opacity-50')}
							onClick={() => goTo(page + 1)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
