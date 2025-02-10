export default interface IRepository<T> {
    create(entity: T): Promise<void>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T>;
    update(entity: T): Promise<void>;
    delete(entity: T): void;    
}